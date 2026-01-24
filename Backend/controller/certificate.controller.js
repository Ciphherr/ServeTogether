import stack from "../config/contentstack.js"
import chromium from "@sparticuz/chromium"
import puppeteerCore from "puppeteer-core"
import { certificateTemplate } from "../templates/certificate.template.js"

const isVercel = !!process.env.VERCEL

const getCertificateAssetURL = async () => {
  try {
    const response = await stack.asset()
      .query({ folder: "bltb16dcf08353211bb" }) // your stack folder
      .find()

    return response.items?.[0]?.url || null
  } catch (err) {
    console.error("Error fetching certificate asset:", err)
    return null
  }
}

export const generateCertificate = async (req, res) => {
  try {
    // 1️⃣ Background image
    const BG_IMAGE_URL = await getCertificateAssetURL()
    if (!BG_IMAGE_URL) {
      return res.status(500).json({ error: "Certificate template missing" })
    }

    // 2️⃣ Data (later this will come from registration)
    const {
      name ,
      event ,
      date ,
      certId ,
    } = req.body

    // 3️⃣ Generate HTML (NO fs)
    const html = certificateTemplate({
      name,
      event,
      date,
      certId,
      bgImage: BG_IMAGE_URL,
    })

    // 4️⃣ Launch browser
    let browser
    if (isVercel) {
      browser = await puppeteerCore.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      })
    } else {
      const puppeteer = (await import("puppeteer")).default
      browser = await puppeteer.launch({ headless: true })
    }

    // 5️⃣ Render PDF
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
    })

    await browser.close()

    // 6️⃣ Response
    res.setHeader("Content-Type", "application/pdf")
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${certId}.pdf"`
    )
    res.send(pdfBuffer)

  } catch (err) {
    console.error("Certificate generation failed:", err)
    res.status(500).json({ error: "Certificate generation failed" })
  }
}
