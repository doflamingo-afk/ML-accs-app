// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe2a9KNIlSpPqX1chHfVeGzVR2xcMWu88",
  authDomain: "ml-accs-29667.firebaseapp.com",
  projectId: "ml-accs-29667",
  storageBucket: "ml-accs-29667.firebasestorage.app",
  messagingSenderId: "596259472222",
  appId: "1:596259472222:web:e058877daff664fb2285cf"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// TikTok Feed ကို Data ဆွဲထည့်မယ့် Function
async function loadPosts() {
    const feedContainer = document.getElementById('mainFeed');
    const snapshot = await db.collection('posts').get();
    
    feedContainer.innerHTML = ''; // အဟောင်းတွေရှင်းမယ်

    snapshot.forEach(doc => {
        const post = doc.data();
        const postElement = `
            <div class="post" style="position:relative; width:100vw; height:100vh; background:black; display:flex; align-items:center; justify-content:center;">
                <img src="${post.imageUrl}" style="max-width:100%; max-height:100%; object-fit:contain;">
                <div class="post-sidebar" style="position:absolute; right:15px; bottom:150px; color:white; text-align:center;">
                    <div class="action-btn">❤️<br><span>${post.likes || 0}</span></div>
                    <div class="action-btn">💬<br><span>0</span></div>
                </div>
                <div class="post-footer" style="position:absolute; bottom:80px; left:20px; color:white;">
                    <h4>@ml_seller_pro</h4>
                    <p>${post.description}</p>
                    <b style="color:#fe2c55;">Price: ${post.price}</b>
                </div>
            </div>
        `;
        feedContainer.innerHTML += postElement;
    });
}

// App စဖွင့်တာနဲ့ Post တွေပြမယ်
loadPosts();
// Form ဖွင့်/ပိတ် လုပ်တဲ့ Function
function toggleUpload() {
    const modal = document.getElementById('uploadModal');
    modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
}

// အလယ်က + ခလုတ်ကို နှိပ်ရင် Form ပွင့်အောင် ချိတ်မယ်
document.querySelector('.nav-item.plus').addEventListener('click', toggleUpload);

// Post တင်တဲ့ Function (လောလောဆယ် Firestore ထဲ တန်းထည့်တာ)
async function uploadPost() {
    const price = document.getElementById('accPrice').value;
    const desc = document.getElementById('accDesc').value;
    const files = document.getElementById('fileInput').files;

    if(!price || !desc || files.length === 0) {
        alert("Please fill all fields and select a photo!");
        return;
    }

    // AI Warn: ပုံတင်ဖို့ Storage မရသေးတဲ့အတွက် လောလောဆယ် စမ်းသပ်ပုံ Link ကိုပဲ သုံးထားမယ်
    try {
        await db.collection('posts').add({
            imageUrl: "https://wallpapercave.com/wp/wp6602334.jpg", // နောက်အဆင့်မှာ ImgBB နဲ့ ချိတ်မယ်
            price: price,
            description: desc,
            likes: 0,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert("Success! Your post is live.");
        toggleUpload(); // Form ပိတ်မယ်
        loadPosts();    // Feed ကို Refresh လုပ်မယ်
    } catch (error) {
        alert("Error: " + error.message);
    }
}
