// CertificatePreview.jsx
const CertificatePreview =()=>{
  return (
    <div
      className="relative w-[1123px] h-[794px] bg-cover"
      style={{ backgroundImage: "url('./src/assets/serve-together.png')" }}
    >
      <div className="absolute top-[360px] w-full text-center text-5xl font-bold">
        John Doe
      </div>

      <div className="absolute top-[453px] w-full text-center text-[22px]">
        Beach Cleaning
      </div>

      <div className="absolute bottom-[263px] right-[420px] text-[22px]">
        24/01/26
      </div>

      <div className="absolute bottom-[50px] left-[80px] text-sm">
        3297585-584-453809
      </div>
    </div>
  )
}


export default CertificatePreview;