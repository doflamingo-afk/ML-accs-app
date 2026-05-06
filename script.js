// ၁။ Firebase Configuration
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

// ၂။ ImgBB API Key (မင်းပေးတာ ထည့်ထားတယ်)
const IMGBB_API_KEY = '7a311d3c3f79a9940ee3a577c46fefea';

// ၃။ Feed ကို Database ထဲကနေ ဆွဲထုတ်ပြမယ့် Function
async function loadPosts() {
    const feedContainer = document.getElementById('mainFeed');
    try {
        const snapshot = await db.collection('posts').orderBy('timestamp', 'desc').get();
        feedContainer.innerHTML = ''; 

        snapshot.forEach(doc => {
            const post = doc.data();
            const postElement = `
                <div class="post" style="position:relative; width:100vw; height:100vh; background:black; display:flex; align-items:center; justify-content:center;">
                    <img src="${post.imageUrl}" style="max-width:100%; max-height:100%; object-fit:contain;">
                    <div class="post-sidebar" style="position:absolute; right:15px; bottom:150px; color:white; text-align:center;">
                        <div class="action-item">❤️<br><span>${post.likes || 0}</span></div>
                    </div>
                    <div class="post-footer" style="position:absolute; bottom:100px; left:20px; color:white;">
                        <h4>@ml_seller_pro</h4>
                        <p>${post.description}</p>
                        <b style="color:#fe2c55; font-size:1.2rem;">Price: ${post.price}</b>
                    </div>
                </div>
            `;
            feedContainer.innerHTML += postElement;
        });
    } catch (error) {
        console.error("Error loading posts: ", error);
    }
}

// ၄။ Form ဖွင့်/ပိတ် လုပ်တဲ့ Function
function toggleUpload() {
    const modal = document.getElementById('uploadModal');
    modal.style.display = (modal.style.display === 'none' || modal.style.display === '') ? 'block' : 'none';
}

// ၅။ အလယ်က + ခလုတ်ကို နှိပ်ရင် Form ပွင့်အောင် ချိတ်မယ်
const plusBtn = document.getElementById('plusBtn');
if (plusBtn) plusBtn.onclick = toggleUpload;

// ၆။ Post တင်တဲ့ Function (ImgBB ကို ပုံအရင်ပို့မယ်)
async function uploadPost() {
    const price = document.getElementById('accPrice').value;
    const desc = document.getElementById('accDesc').value;
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!price || !desc || !file) {
        alert("အချက်အလက်အားလုံး ပြည့်စုံအောင် ဖြည့်ပေးပါ!");
        return;
    }

    alert("ပုံတင်နေပါပြီ ခဏစောင့်ပါ...");

    // ImgBB ကို ပုံပို့တဲ့အပိုင်း
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        const finalImageUrl = data.data.url;

        // Firebase Firestore ထဲ သိမ်းမယ်
        await db.collection('posts').add({
            imageUrl: finalImageUrl,
            price: price,
            description: desc,
            likes: 0,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert("အောင်မြင်စွာ တင်ပြီးပါပြီ!");
        toggleUpload();
        location.reload(); 
    } catch (error) {
        alert("Error: " + error.message);
    }
}

// App စဖွင့်တာနဲ့ ပုံတွေပြမယ်
loadPosts();
