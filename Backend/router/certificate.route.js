import express from "express"
import { generateCertificate } from "../controller/certificate.controller.js"

const router = express.Router()

// ✅ Test route for generating certificate
router.post("/generate", generateCertificate)

// Optional: quick GET route for testing with default data
router.get("/test", async (req, res) => {
  try {
    // Simulate request body
    req.body = {
      name: "Test User",
      event: "Beach Cleaning",
      date: "24/01/26",
      certId: "TEST-001",
    }
    await generateCertificate(req, res)
  } catch (err) {
    console.error(err)
    res.status(500).send("Test certificate generation failed")
  }
})

export default router
