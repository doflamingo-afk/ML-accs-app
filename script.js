// ၁။ Firebase Setup
const firebaseConfig = {
  apiKey: "AIzaSyCe2a9KNIlSpPqX1chHfVeGzVR2xcMWu88",
  authDomain: "ml-accs-29667.firebaseapp.com",
  databaseURL: "https://ml-accs-29667-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ml-accs-29667",
  storageBucket: "ml-accs-29667.firebasestorage.app",
  messagingSenderId: "596259472222",
  appId: "1:596259472222:web:e058877daff664fb2285cf",
  measurementId: "G-5VD1SB1YYB"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const IMGBB_KEY = '7a311d3c3f79a9940ee3a577c46fefea';

// ၂။ Feed ကို ပြသခြင်း (Like, Comment, Share Button များပါဝင်သည်)
async function loadPosts() {
    const feed = document.getElementById('mainFeed');
    const snapshot = await db.collection('posts').orderBy('timestamp', 'desc').get();
    feed.innerHTML = '';

    snapshot.forEach(doc => {
        const post = doc.data();
        const id = doc.id;
        feed.innerHTML += `
            <div class="post-container">
                <img src="${post.imageUrl}" class="post-media">
                <div class="post-sidebar">
                    <div class="action-item" onclick="handleLike('${id}')">
                        <i class="fa-solid fa-heart" id="heart-${id}"></i>
                        <span>${post.likes || 0}</span>
                    </div>
                    <div class="action-item" onclick="alert('Comments are disabled for this account.')">
                        <i class="fa-solid fa-comment-dots"></i>
                        <span>0</span>
                    </div>
                    <div class="action-item" onclick="handleShare('${post.imageUrl}')">
                        <i class="fa-solid fa-share"></i>
                        <span>Share</span>
                    </div>
                </div>
                <div class="post-footer">
                    <h4>@ml_seller_pro</h4>
                    <p>${post.description}</p>
                    <b>${post.price} MMK</b>
                </div>
            </div>
        `;
    });
}

// ၃။ Like Function
async function handleLike(id) {
    const heart = document.getElementById(`heart-${id}`);
    heart.style.color = '#fe2c55'; // အနီရောင်ပြောင်းမယ်
    await db.collection('posts').doc(id).update({
        likes: firebase.firestore.FieldValue.increment(1)
    });
    // အရေအတွက်ကို UI မှာ တန်းတိုးပြမယ်
    let count = heart.nextElementSibling;
    count.innerText = parseInt(count.innerText) + 1;
}

// ၄။ Share Function
function handleShare(url) {
    navigator.clipboard.writeText(url);
    alert("Image Link copied! Share it with your friends.");
}

// ၅။ Upload Function
async function uploadPost() {
    const price = document.getElementById('accPrice').value;
    const desc = document.getElementById('accDesc').value;
    const file = document.getElementById('fileInput').files[0];

    if(!price || !desc || !file) return alert("Fill all info!");

    alert("Uploading... Please wait.");
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, { method:'POST', body:formData });
    const data = await res.json();

    await db.collection('posts').add({
        imageUrl: data.data.url,
        price: price,
        description: desc,
        likes: 0,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    location.reload();
}

function toggleUpload() {
    const m = document.getElementById('uploadModal');
    m.style.display = m.style.display === 'none' ? 'block' : 'none';
}

document.getElementById('plusBtn').onclick = toggleUpload;
loadPosts();
