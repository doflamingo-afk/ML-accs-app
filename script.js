// ၁။ Firebase Configuration (မင်းပေးတဲ့ Key အသစ်တွေ ထည့်ထားတယ်)
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

// ၂။ Initialize Firebase (Compat version ကို သုံးထားတယ်)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ၃။ Feed ကို Database ထဲကနေ ဆွဲထုတ်ပြမယ့် Function
async function loadPosts() {
    const feedContainer = document.getElementById('mainFeed');
    try {
        // posts collection ထဲက data တွေကို အချိန်နဲ့တပြေးညီ ယူမယ်
        const snapshot = await db.collection('posts').orderBy('timestamp', 'desc').get();
        feedContainer.innerHTML = ''; 

        snapshot.forEach(doc => {
            const post = doc.data();
            const postElement = `
                <div class="post" style="position:relative; width:100vw; height:100vh; background:black; display:flex; align-items:center; justify-content:center;">
                    <img src="${post.imageUrl}" style="max-width:100%; max-height:100%; object-fit:contain;">
                    <div class="post-sidebar" style="position:absolute; right:15px; bottom:150px; color:white; text-align:center;">
                        <div class="action-item" onclick="alert('Liked!')">❤️<br><span>${post.likes || 0}</span></div>
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

// ၄။ ပုံတင်တဲ့ Form ကို ဖွင့်/ပိတ် လုပ်တဲ့အပိုင်း
function toggleUpload() {
    const modal = document.getElementById('uploadModal');
    if (modal.style.display === 'none' || modal.style.display === '') {
        modal.style.display = 'block';
    } else {
        modal.style.display = 'none';
    }
}

// ၅။ အလယ်က + ခလုတ်ကို နှိပ်ရင် Form ပွင့်အောင် ချိတ်မယ်
const plusButton = document.getElementById('plusBtn');
if (plusButton) {
    plusButton.onclick = toggleUpload;
}

// ၆။ POST NOW နှိပ်ရင် Firestore ထဲ ဒေတာထည့်မယ်
async function uploadPost() {
    const price = document.getElementById('accPrice').value;
    const desc = document.getElementById('accDesc').value;
    
    if(!price || !desc) {
        alert("ဈေးနှုန်းနဲ့ အကြောင်းအရာ ဖြည့်ပေးပါဦး!");
        return;
    }

    try {
        await db.collection('posts').add({
            imageUrl: "https://wallpapercave.com/wp/wp6602334.jpg", // လောလောဆယ် ပုံအသေပဲ
            price: price,
            description: desc,
            likes: 0,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert("အောင်မြင်စွာ တင်ပြီးပါပြီ!");
        toggleUpload();
        loadPosts(); // ပြန်ဖတ်ခိုင်းမယ်
    } catch (e) {
        alert("Error: " + e.message);
    }
}

// App စဖွင့်တာနဲ့ ပုံတွေပြမယ်
loadPosts();
