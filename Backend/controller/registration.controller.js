import stack from "../config/contentstack.js";


export const registerForEvent = async (req, res) => {
  try {
    const {
      full_name,
      age,
      gender,
      phone_number,
      email,
      event_uid,
      event_title,
      user_uid
    } = req.body;


    if (!full_name || !email || !event_uid) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const entry = await stack
      .contentType("registration_chirag")
      .entry()
      .create({
        entry: {
          title: `Registration - ${Date.now()}`,
          opportunity_title: event_title,
          full_name,
          age: Number(age),
          gender,
          phone_number: Number(phone_number),
          email,
          opportunity: [
            {
              uid: event_uid,
              _content_type_uid: "opportunity_chirag",
            }],
          user : [
            {
              uid: user_uid,
              _content_type_uid: "users_chirag",
            }]
        },
      });

    await entry.publish({
        publishDetails: {
          environments: ["cvp"], // 👈 your env UID
          locales: ["en-us"],
        },
    });

    res.status(201).json({ success: true, entry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
};
