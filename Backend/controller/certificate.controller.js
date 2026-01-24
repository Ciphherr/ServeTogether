import stack from "../config/contentstack.js";
import chromium from "@sparticuz/chromium"
import puppeteer from "puppeteer-core"
import fs from "fs"
import path from "path"

const isVercel = !!process.env.VERCEL

const getCertificateAssetURL = async () => {
  try {
    const response = await stack.asset()
      .query({ folder: 'bltb16dcf08353211bb' }) // folder path in your stack
      .find()

      const result = response.items[0].url;
      return result
  } catch (err) {
    console.error("Error fetching certificate asset:", err)
    return null
  }
}

export const generateCertificate = async (req, res) => {
  try {
    const BG_IMAGE_URL = await getCertificateAssetURL()
    if (!BG_IMAGE_URL) {
      return res.status(500).json({ error: "Certificate template missing" })
    }

    const { name, event, date, certId } = req.body

    let html = fs.readFileSync(
      path.join(process.cwd(), "templates/certificate.html"),
      "utf8"
    )

    html = html
      .replace("{{NAME}}", name )
      .replace("{{EVENT}}", event)
      .replace("{{DATE}}", date )
      .replace("{{CERT_ID}}", certId || "ST-5678-67")
      .replace("{{BG_IMAGE}}", BG_IMAGE_URL)

    let browser


    if (isVercel) {
      browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      })
    } else {
      const puppeteer = (await import("puppeteer")).default
      browser = await puppeteer.launch({ headless: true })
    }

    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
    })

    await browser.close()

    res.setHeader("Content-Type", "application/pdf")
    res.setHeader("Content-Disposition", "attachment; filename=test.pdf")
    res.send(pdfBuffer)

  } catch (err) {
    console.error("Certificate generation failed:", err)
    res.status(500).json({ error: "Certificate generation failed" })
  }
}


