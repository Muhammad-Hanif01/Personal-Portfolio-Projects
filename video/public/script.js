document.getElementById('analyzeBtn').addEventListener('click', async () => {
    const url = document.getElementById('videoUrl').value;
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');

    if (!url) return alert("Link dalein!");

    loading.classList.remove('d-none');
    result.classList.add('d-none');

    const response = await fetch('/api/fetch-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
    });

    const data = await response.json();
    loading.classList.add('d-none');

    if (data.success) {
        result.classList.remove('d-none');
        document.getElementById('title').innerText = data.title;
        document.getElementById('thumb').src = data.thumbnail;
        
        // Asli Local Download Link
        document.getElementById('dlLink').href = `/download-now?url=${encodeURIComponent(url)}`;
    }
});

const dlBtn = document.getElementById('dlLink');
dlBtn.onclick = () => {
    dlBtn.classList.add('disabled');
    dlBtn.innerText = "Downloading to your System... Please Wait";
};