export const certificateTemplate = ({
  name,
  event,
  date,
  certId,
  bgImage,
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      margin: 0;
      width: 1123px;
      height: 794px;
      background-image: url('${bgImage}');
      background-size: cover;
      background-repeat: no-repeat;
      font-family: Arial, sans-serif;
      position: relative;
    }

    .name {
      position: absolute;
      top: 360px;
      width: 100%;
      text-align: center;
      font-size: 48px;
      font-weight: bold;
    }

    .event {
      position: absolute;
      top: 453px;
      width: 100%;
      text-align: center;
      font-size: 22px;
    }

    .date {
      position: absolute;
      bottom: 263px;
      right: 420px;
      font-size: 22px;
    }

    .cert {
      position: absolute;
      bottom: 50px;
      left: 80px;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="name">${name}</div>
  <div class="event">${event}</div>
  <div class="date">${date}</div>
  <div class="cert">${certId}</div>
</body>
</html>
`
