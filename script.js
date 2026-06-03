// SİSTEM DEĞİŞKENLERİ (Hata almamak için tanımlandı)
let cart = {};
let isSnapped = false;
let globalStock = 500;
let totalP = 0;
let totalPow = 0;
let totalCart = 0;
let currentVariantIndex = 1;
const totalVariants = 3;
let cartOffcanvas;
let currentSlideIndex = 0; 

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SAĞ TIK İLE RESİM GEÇME PROTOKOLÜ ---
    // 'hero-slider' id'li ana kapsayıcıyı seçiyoruz
    const sliderContainer = document.getElementById('hero-slider');
    const sliderTrack = document.getElementById('sliderTrack');
    
    if (sliderContainer && sliderTrack) {
        sliderContainer.addEventListener('contextmenu', (e) => {
            e.preventDefault(); // Tarayıcının sağ tık menüsünü engeller
            
            const slides = sliderTrack.querySelectorAll('.slide');
            if (slides.length > 0) {
                // İndeksi bir artır, sona gelince başa dön
                currentSlideIndex = (currentSlideIndex + 1) % slides.length;
                
                // Kaydırma işlemini uygula
                sliderTrack.style.transform = `translateX(${-currentSlideIndex * 100}%)`;
                
                // Terminale bilgi bas
                addLiveMessage(`Varyant-${currentSlideIndex + 1} Aktif Edildi.`, 'text-info');
                
                // Varsa ilerleme çubuğunu güncelle
                const progressBar = document.getElementById('sliderProgress');
                if (progressBar) {
                    const percent = ((currentSlideIndex + 1) / slides.length) * 100;
                    progressBar.style.width = percent + "%";
                }
            }
        });
    }
  
});
// GİRİŞ FONKSİYONU (Form submit edildiğinde çalışır)
function handleLogin() {
    if(event) event.preventDefault();
    const userField = document.getElementById('username');
    const passField = document.getElementById('password');

    if (!userField || !passField) return;

    const user = userField.value.trim();
    const pass = passField.value.trim();

    const isAdmin = (user === "admin" && pass === "shield123");
    const savedPass = localStorage.getItem("agent_" + user);

    if (isAdmin || (savedPass && savedPass === pass)) {
        addLiveMessage(`ERİŞİM ONAYLANDI: Ajan ${user}`, "text-success");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("agentName", user);
        
        // Modalı Kapat
        const loginModal = document.getElementById('loginModal');
        const modalInstance = bootstrap.Modal.getInstance(loginModal);
        if (modalInstance) modalInstance.hide();

        checkLoginStatus(); 

        // --- ÇÖZÜM BURADA: Yönlendirme Protokolü ---
        addLiveMessage("SİSTEM: Dashboard'a aktarılıyorsunuz...", "text-warning");
        
        // Yarım saniye terminal mesajını görsün diye bekletip gönderiyoruz
        setTimeout(() => {
            window.location.href = "dashboard.html"; 
        }, 600);
        
    } else {
        addLiveMessage("KRİTİK HATA: Kimlik doğrulanamadı!", "text-danger");
        alert("Erişim Reddedildi!");
    }
}

// KAYIT OL FONKSİYONU (Kayıt ol butonuna onclick="handleRegister()" eklendiğinde çalışır)
function handleRegister() {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    if (user === "" || pass === "") {
        alert("S.H.I.E.L.D. protokolü: Ajan kodu ve şifre boş bırakılamaz!");
        return;
    }

    localStorage.setItem("agent_" + user, pass);
    addLiveMessage(`KAYIT BAŞARILI: Ajan ${user} yetkilendirildi.`, "text-warning");
    alert("Kayıt başarılı, Ajan " + user + ". Şimdi sisteme giriş yapabilirsiniz.");
}
// 1. GÜÇ, DAYANIKLILIK VE BİLGİ EKLENMİŞ KART ÜRETİMİ
function generateCards() {
    const container = document.getElementById('card-container');
    if (!container) return;

    const trees = [
        { name: "Groot Bonsai", price: 5500, power: 60, dur: 85, info: "Kendini yenileyebilen,sınırlı kelime haznesine sahip dekoratif ağaç.", img: "Groot1.png.png" },
        { name: "Mjolnir Meşesi", price: 7200, power: 95, dur: 99, info: "Yıldırımları çeken,fırtınaya dayanıklı Asgerd kökenli meşe.", img: "mjolnir meşesi.png" },
        { name: "Vibranyum Söğüdü", price: 9800, power: 120, dur: 70, info: "Wakanda topraklarından miras.", img: "vibranyum söğüdü.png" },
        { name: "Vibranyum Bambusu", price: 8900, power: 110, dur: 95, info: "Wakanda teknolojisi ile güçlendirilmiş,darbe emici gövde yapısı.", img: "vibranyum bambusu.png" },
        { name: "Hulk Sekoyası", price: 6500, power: 150, dur: 100, info: "Gama radyasyonuyla güçlendirilmiş.", img: "hulk sekoyası.png" },
        { name: "Mistik Sakura", price: 12000, power: 80, dur: 60, info: "Zamanın ötesinde bir güzellik;yaprakları gerçekliği bükebilir.", img: "mistik sakura.png" },
        { name: "Spider Akasyası", price: 4200, power: 70, dur: 80, info: "Esnek ve yapışkan lif yapısı.", img: "spider akasyası.png" },
        { name: "Hızlı Büyüyen Bambu", price: 5100, power: 85, dur: 75, info: "Pietro Maximoff serisi:Dünyanın en hızlı büyüyen gümüş bambusu,anında yeşillik sağlar.", img: "hızlı büyüyen bambu.png" },
        { name: "Captain Akçaağaç", price: 7700, power: 90, dur: 120, info: "Süper serum takviyeli kökler.", img: "captain akçaağaç.png" },
        { name: "Hassas Açılı Ladin", price: 6200, power: 65, dur: 70, info: "Clint Barton serisi:Dalları her zaman tam istenen açıda büyüyen,düzenli Hawkeye ladini.", img: "hassas açılı ladin.png" },
        { name: "Casus Sarmaşığı", price: 3500, power: 40, dur: 50, info: "Hızlı yayılan,her türlü yüzeye tırmanabilen gizlilik ustası.", img: "casus sarmaşığı.png" },
        { name: "Gamma Devi", price: 8400, power: 105, dur: 110, info: "Bruce Banner serisi:Kuraklıkta devasa boyutlara ulaşan,yıkılmaz kaktüs.", img: "gamma devi.png" },
        { name: "Sentinel Meşe", price: 11000, power: 130, dur: 65, info: "Steve Rogers serisi:Asla pes etmeyen,zararlılara %100 dirençli koruyucu ağaç.", img: "sentinel meşe.png" },
        { name: "Foton Enerjili Ladin", price: 9200, power: 100, dur: 90, info: "Carol Danvers serisi:Geceleri kozmik foton enerjisiyle parlayan,evrenin en güçlü ağacı.", img: "foton enerjili ladin.png" },
        { name: "Boyutlar Arası Sakura", price: 13500, power: 140, dur: 150, info: "Stephen Strange serisi:Zamanı ve gerçekliği bükebilen,mistik enerji yayan ağaç.", img: "boyutlar arası sakura.png" },
        { name: "Black Panther Akasyası", price: 10500, power: 115, dur: 115, info: "Kalp şekilli yaprak özütü içerir.", img: "black panther akasyası.png" },
        { name: "Doctor Strange Palmiyesi", price: 12500, power: 145, dur: 80, info: "Çoklu evren geçitleri açabilir.", img: "doctor strange palmiyesi.png" },
        { name: "Gizlilik Ustası Sarmaşık", price: 6800, power: 75, dur: 55, info: "Natasha Romanoff serisi:Hızlı yayılan,her yüzeye tırmanabilen,krımızı ve siyah sarmaşık", img: "gizlilik ustası sarmaşık.png" },
        { name: "Dikey Ağaç", price: 7900, power: 95, dur: 85, info: "Peter Parker serisi:Şehir ortamına kodlanmış,dikey büyüyen esnek çınar.", img: "dikey ağaç.png" },
        { name: "Şok Emen Bambu", price: 8200, power: 110, dur: 130, info: "T'Challa serisi:Kırılması imkansız,şok dalgalarını emen Wakanda teknolojili bambu. ", img: "şok emen bambu.png" },
        { name: "Tesseract Kristal Çamı", price: 15000, power: 200, dur: 60, info: "Sonsuz enerji kaynağı mutasyonu.", img: "tesseract kristal çamı.png" }
    ];

    container.innerHTML = ''; 

    trees.forEach((t, index) => {
        let i = index + 1; 
        container.innerHTML += `
            <div class="col-md-4 mb-4 card-item" id="card-${i}">
                <div class="card text-white bg-black border-secondary h-100 p-0 stark-card overflow-hidden">
                    <div class="tree-img-container" style="height: 180px; overflow: hidden; background: #050505;">
                        <img src="${t.img}" class="card-img-top w-100 h-100" style="object-fit: cover; opacity: 0.8;" alt="${t.name}">
                    </div>
                    <div class="p-3">
                        <h6 class="font-orbitron text-uppercase text-info" style="font-size: 13px; height: 18px; overflow: hidden;">${t.name}</h6>
                        <p class="small text-secondary mb-3" style="font-size: 11px; height: 32px;">${t.info}</p>
                        <div class="stats-area mb-3">
                            <div class="d-flex justify-content-between small font-mono" style="font-size: 10px;"><span>GÜÇ:</span><span>${t.power}%</span></div>
                            <div class="progress mb-2" style="height: 3px; background: #222;">
                                <div class="progress-bar bg-info" style="width: ${t.power > 100 ? 100 : t.power}%"></div>
                            </div>
                            <div class="d-flex justify-content-between small font-mono" style="font-size: 10px;"><span>DAYANIKLILIK:</span><span>${t.dur}%</span></div>
                            <div class="progress" style="height: 3px; background: #222;">
                                <div class="progress-bar bg-success" style="width: ${t.dur}%"></div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center border-top border-secondary pt-2 mt-2">
                            <span class="font-orbitron text-warning" style="font-size: 14px;">₺${t.price.toLocaleString()}</span>
                            <div class="btn-group">
                                <button class="btn btn-outline-info btn-xs py-0 px-2" onclick="updateItem(${i}, '${t.name}', ${t.price}, ${t.power}, 'minus')">-</button>
                                <span class="px-2 align-self-center font-mono small" id="qty-${i}">0</span>
                                <button class="btn btn-outline-info btn-xs py-0 px-2" onclick="updateItem(${i}, '${t.name}', ${t.price}, ${t.power}, 'plus')">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    });
}

// 2. SEPET GÜNCELLEME (ARTI / EKSİ / TEMİZLE)
function updateItem(id, name, price, power, action) {
    if (!cart[id]) cart[id] = { name, price, power, qty: 0 };

    if (action === 'plus' && globalStock > 0) {
        cart[id].qty++; globalStock--; totalP += price; totalPow += power; totalCart++;
        addLiveMessage(`${name} eklendi.`);
    } else if (action === 'minus' && cart[id].qty > 0) {
        cart[id].qty--; globalStock++; totalP -= price; totalPow -= power; totalCart--;
        addLiveMessage(`${name} çıkarıldı.`, 'text-warning');
    }

    const qtyEl = document.getElementById(`qty-${id}`);
    if (qtyEl) qtyEl.innerText = cart[id].qty;
    updateGlobalUI();
}

// SEPETİ SIFIRLAMA FONKSİYONU (YENİ)
function clearCart() {
    for (let id in cart) {
        globalStock += cart[id].qty; // Stokları geri iade et
        const qtyEl = document.getElementById(`qty-${id}`);
        if (qtyEl) qtyEl.innerText = 0;
    }
    cart = {};
    totalP = 0; totalPow = 0; totalCart = 0;
    addLiveMessage("SİSTEM: Envanter Sıfırlandı.", "text-danger");
    updateGlobalUI();
}

// 3. MOD DEĞİŞTİRME (S.H.I.E.L.D. TEMASI)
function toggleMode() {
    document.body.classList.toggle('stark-theme');
    const isStark = document.body.classList.contains('stark-theme');
    addLiveMessage(isStark ? "MOD: Stark Endüstriyel Protokolü" : "MOD: S.H.I.E.L.D. Standart Protokolü", "text-info");
}

// 4. GLOBAL UI GÜNCELLEME
function updateGlobalUI() {
    if(document.getElementById('cart-count')) document.getElementById('cart-count').innerText = totalCart;
    if(document.getElementById('stock-count')) document.getElementById('stock-count').innerText = globalStock;
    if(document.getElementById('total-price')) document.getElementById('total-price').innerText = totalP.toLocaleString();
    if(document.getElementById('total-power')) document.getElementById('total-power').innerText = totalPow;
    if(document.getElementById('panel-price')) document.getElementById('panel-price').innerText = totalP.toLocaleString() + " ₺";
    
    const progressEl = document.getElementById('stock-progress');
    if(progressEl) progressEl.style.width = (globalStock / 5) + '%';

    updateCartList();
}

function updateCartList() {
    const list = document.getElementById('cart-items-list');
    if (!list) return;
    list.innerHTML = '';
    let empty = true;
    for (let id in cart) {
        if (cart[id].qty > 0) {
            empty = false;
            list.innerHTML += `
                <div class="d-flex justify-content-between align-items-center mb-2 border-bottom border-secondary pb-1">
                    <span class="small">${cart[id].name} x${cart[id].qty}</span>
                    <div class="text-end">
                        <div class="text-danger small">₺${(cart[id].qty * cart[id].price).toLocaleString()}</div>
                        <button class="btn btn-xs btn-outline-light mt-1" style="font-size:8px" onclick="updateItem(${id}, '${cart[id].name}', ${cart[id].price}, ${cart[id].power}, 'minus')">SİL</button>
                    </div>
                </div>`;
        }
    }
    if (empty) list.innerHTML = '<p class="text-secondary small">Envanter taranıyor...</p>';
}

// CANLI TERMİNAL MESAJI
function addLiveMessage(msg, className = 'text-success') {
    const liveArea = document.querySelector('.live-message-area');
    if (!liveArea) return;
    const msgElement = document.createElement('div');
    msgElement.className = `${className} small mb-1`;
    msgElement.innerText = `> ${msg}`;
    liveArea.prepend(msgElement);
    if (liveArea.children.length > 5) liveArea.removeChild(liveArea.lastChild);
}

// DİĞER FONKSİYONLAR
function toggleCartPanel() {
    const cartEl = document.getElementById('cart-side-panel');
    // Eğer değişken globalde tanımlanmadıysa burada oluştur
    if (!cartOffcanvas) {
        cartOffcanvas = new bootstrap.Offcanvas(cartEl);
    }
    cartOffcanvas.toggle();
}
function nextVariant(e) { e.preventDefault(); /* Carousel mantığın burada devam edebilir */ }
// Slider Değişkenleri (Emin olmak için tekrar tanımlıyoruz)


function checkout() {
    // Sepetteki toplam ürün sayısını dinamik olarak hesapla
    let currentTotalQty = 0;
    for (let id in cart) {
        currentTotalQty += cart[id].qty;
    }

    if (currentTotalQty === 0) {
        addLiveMessage("HATA: Envanter boş! Alışveriş başlatılamadı.", "text-danger");
        
        // Kullanıcıya görsel geri bildirim ver
        const cartIcon = document.querySelector('.cart-icon-wrapper');
        cartIcon.classList.add('shake-animation'); // Varsa bir sarsıntı efekti
        setTimeout(() => cartIcon.classList.remove('shake-animation'), 500);
        
        return;
    }

    addLiveMessage("SİSTEM: Ödeme protokolü hazırlanıyor...", "text-info");
    
    // 1 saniye gecikmeli yönlendirme (daha gerçekçi bir terminal hissi için)
    setTimeout(() => {
        // Eğer dosya adın farklıysa 'odeme.html' kısmını değiştir
        window.location.href = "odeme.html";
    }, 1000);
}
// Menü linklerine tıklandığında sidebar'ı kapat
document.querySelectorAll('#shieldSidebar .offcanvas-body a').forEach(link => {
    link.addEventListener('click', () => {
        const sidebar = document.getElementById('shieldSidebar');
        const instance = bootstrap.Offcanvas.getInstance(sidebar);
        if (instance) instance.hide();
    });
});
function thanosSnap() {
    // 1. Kartları tam olarak seçtiğimizden emin olalım
    const cards = document.querySelectorAll('.card-item'); 
    
    // Eğer kart bulunamadıysa uyarı ver (Konsolda görünür)
    if (cards.length === 0) {
        console.error("Thanos Hatası: Yok edilecek kart bulunamadı!");
        return;
    }

    // 2. Durumu değiştir
    isSnapped = !isSnapped; 

    addLiveMessage(isSnapped ? "KRİTİK: Thanos Şıklatması Tespit Edildi." : "STABİL: Evren Restore Edildi.", isSnapped ? "text-danger" : "text-success");

    // 3. Kartlara müdahale et
    cards.forEach(card => {
        if (isSnapped) {
            // Rastgele %50 ihtimalle toz yap
            if (Math.random() > 0.5) {
                card.style.transition = "all 2s ease-in-out";
                card.style.opacity = "0";
                card.style.transform = "translateY(-50px) scale(0.5) rotate(10deg)";
                card.style.filter = "blur(15px) grayscale(100%)";
                card.style.pointerEvents = "none"; // Tıklanamaz yap
            }
        } else {
            // Her şeyi geri getir
            card.style.opacity = "1";
            card.style.transform = "translateY(0) scale(1) rotate(0deg)";
            card.style.filter = "blur(0px) grayscale(0%)";
            card.style.pointerEvents = "auto";
        }
    });
}
function sendSignal() {
    const btn = document.querySelector('#contact-form button');
    const originalText = btn.innerHTML;
    
    // Terminal Logu
    addLiveMessage("VERİ PAKETLENİYOR...", "text-warning");
    
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> ŞİFRELENİYOR...';

    setTimeout(() => {
        addLiveMessage("SİNYAL İLETİLDİ: Mesaj Stark Tower'a ulaştı.", "text-success");
        btn.innerHTML = '<i class="fas fa-check me-2"></i> BAŞARILI';
        btn.classList.replace('btn-outline-danger', 'btn-success');
        
        // 3 saniye sonra formu sıfırla
        setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = originalText;
            btn.classList.replace('btn-success', 'btn-outline-danger');
            document.getElementById('contact-form').reset();
        }, 3000);
    }, 2000);
}
function checkLoginStatus() {
    const logged = localStorage.getItem("isLoggedIn");
    const agent = localStorage.getItem("agentName");
    const loginBtn = document.querySelector('[data-bs-target="#loginModal"]');
    
    if (!loginBtn) return;

    if (logged === "true" && agent) {
        // AJAN MODU: Buton yeşil olur ve isim yazar
        loginBtn.innerHTML = `<i class="fas fa-user-shield me-2"></i> AJAN: ${agent.toUpperCase()}`;
        loginBtn.classList.replace('btn-outline-danger', 'btn-success');
        loginBtn.removeAttribute('data-bs-toggle'); 
        loginBtn.style.cursor = "pointer";
        
        // Ajan ismine tıklayınca güvenli çıkış yapma protokolü
        loginBtn.onclick = () => {
            if(confirm("Güvenli çıkış yapmak istediğinize emin misiniz, Ajan?")) {
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("agentName");
                location.reload(); // Sistemi sıfırla
            }
        };
    } else {
        // STANDART MOD: Giriş Yap butonu aktif
        loginBtn.innerHTML = `<i class="fas fa-sign-in-alt me-2"></i> GİRİŞ YAP`;
        loginBtn.classList.add('btn-outline-danger');
        loginBtn.classList.remove('btn-success');
        loginBtn.setAttribute('data-bs-toggle', 'modal');
        loginBtn.style.cursor = "pointer";
        loginBtn.onclick = null; // Tıklama olayını sıfırla (modal açılması için)
    }
}
window.addEventListener('load', () => {
    // 1. UI ve Kartları Başlat
    generateCards(); 
    updateGlobalUI(); 
    checkLoginStatus();

    // 2. Giriş Formunu Bağla (ID bazlı ve submit olayını dinleyerek)
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Sayfa yenilenmesini engeller
            handleLogin();
        });
    }

    // 3. Sosyal Medya İkonları Protokolü
    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            alert("PROTOKOL 10: Sosyal medya sinyalleri şifrelendi. Bu kanaldan veri sızıntısı yapılamaz, Ajan!");
        });
    });
});
z
