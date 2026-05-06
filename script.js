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
