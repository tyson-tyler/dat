export const uploadToCloudinary = async (file: File): Promise<string> => {
  const cloudName = "dblf5n0yn";
  const uploadPreset = "catergory"; // Use your unsigned upload preset

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Cloudinary upload failed");
  }

  const data = await response.json();
  return data.secure_url;
};
