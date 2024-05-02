const express = require("express");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");
const app = express();
const PORT = 5000;

const supabaseUrl = "https://fcrawhxjclgdonqzooka.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjcmF3aHhqY2xnZG9ucXpvb2thIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2NTQwNDMsImV4cCI6MjAzMDIzMDA0M30.LuP7aJVckLC45J_IxYCWT00KlwkyMTOQn-8wgsXmKOU";

const supabase = createClient(supabaseUrl, supabaseKey);
app.use(bodyParser.json());

app.get("/api/chat", async (req, res) => {
  try {
    const { data, error } = await supabase.from("simpul-test").select("*");
    if (error) throw error;
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);

    return res.status(400).json({ error: "error" });
  }
});

app.post("/api/chat", async (req, res) => {
  const { sender, message } = req.body;
  if (!sender || !message) {
    return res.status(400).json({ error: "Sender and message are required" });
  }

  try {
    const { error } = await supabase
      .from("simpul-test")
      .insert([{ sender, message }]);
    if (error) throw error;
    res.status(201).json("berhasil kirim");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
