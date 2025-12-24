document.getElementById("regen").addEventListener("click", async () => {
  const status = document.getElementById("status");
  status.textContent = "Generating new picks...";

  await fetch("/api/picks?force=true");

  status.textContent = "✅ Picks regenerated successfully";
});
