# 🦅 Marvel Garden Terminal

Marvel Evreni'nden, fütüristik askeri üs arayüzlerinden (HUD) ve cyberpunk estetiğinden ilham alınarak tasarlanmış; bünyesinde gelişmiş bir **Biyoteknoloji Laboratuvarı (Egzotik/İlginç Ağaç Departmanı)**, taktiksel radar ve akıllı asistan barındıran **web tabanlı bir ön yüz (Front-End) simülasyon yazılımıdır.**

Bu proje; Bootstrap grid sistemi, asenkron süreçler, özel CSS efektleri ve JavaScript tabanlı dinamik algoritmaların bir arada nasıl hibrit çalışabileceğini gösteren bir portföy/akademik çalışmadır.

---

## 🌐 Canlı Web Sitesi Linki

Proje, GitHub Pages altyapısı kullanılarak tüm dünyanın erişimine açık şekilde canlıya alınmıştır:
🔗 [https://azrakacar.github.io/marvel-garden-terminal/](https://azrakacar.github.io/marvel-garden-terminal/)

---

## 🚀 Öne Çıkan Modüller ve Özellikler

### 1. 🧪 Biyoteknoloji Departmanı (Egzotik Ağaç Envanteri)
* **Açıklama:** S.H.I.E.L.D. üslerinin oksijen filtrasyonu, gizli sığınakların kamufle edilmesi veya vibranyum topraklarının ıslahı için laboratuvarda üretilen mutasyonlu/ilginç ağaçların sergilendiği ve envantere eklendiği ana bölümdür.
* **Teknik Altyapı:** **Bootstrap Card** yapıları neon matrix yeşili gölge efektleriyle (`box-shadow: 0 0 15px rgba(57, 255, 20, 0.3)`) holografik hale getirilmiştir. Görseller, laboratuvar ortamı hissi verilmesi için CSS `filter: hue-rotate()` ve `brightness()` özellikleri ile manipüle edilerek bitkilere mutasyonlu bir hava katılmıştır. `transition` ile hover durumunda mikroskop odaklanma efekti sağlanmıştır.

### 2. 📡 Stratejik Koordinat Tarayıcı (Taktiksel Radar)
* **Açıklama:** Canlı tarama efektiyle alanı tarayan ve potansiyel düşman (HYDRA) sinyallerini tespit eden modül.
* **Teknik Altyapı:** CSS `@keyframes` ile merkez noktası etrafında dönen holografik bir daire tasarlandı. JavaScript asenkron `setTimeout` yapısıyla buton tetiklendikten 3 saniye sonra tehdit algılama simülasyonu başlatılır.

### 3. 🧮 Stratejik Analiz Motoru (Yapay Zekâ Algoritması)
* **Açıklama:** Operasyonun başarı olasılığını anlık olarak hesaplayan karar mekanizması.
* **Teknik Altyapı:** Kullanıcının girdi olarak verdiği Tehdit Seviyesi (Slider) ve Yenilmezler'in destek durumunu (Checkbox) alan matematiksel bir fonksiyon kurgulanmıştır. Başarı oranı kritik seviyeye düştüğünde arayüz rengi JavaScript DOM manipülasyonu ile anlık olarak tehlike kırmızısına dönüşür.

### 4. 💬 J.A.R.V.I.S. V3.0 Protokolü (Sohbet Robotu)
* **Açıklama:** Kullanıcıyla etkileşime giren yarı-akıllı ana karargah asistanı.
* **Teknik Altyapı:** JavaScript string metotları (`includes()`) kullanılarak kullanıcının yazdığı kelimeler filtrelenir; "stark", "görev", "tehlike", "biyoloji", "ağaç" gibi kritik kelimelere fütüristik ve dinamik yanıtlar üretilir.

### 5. 📟 Sistem Komuta Terminali (Canlı Log Akışı)
* **Açıklama:** Sitede yapılan tüm işlemlerin (radar taraması, egzotik ağaç envanter alımları, Jarvis konuşmaları) askeri bir günlük formatında aktığı merkezdir.
* **Teknik Altyapı:** `setInterval` ile sürekli arka plan kontrolleri basılır. Yeni bir ağaç satın alındığında JavaScript `appendChild` ile terminal kutusunun içine dinamik satırlar eklenir. `overflow-y: auto` stili sayesinde taşmalar engellenir ve kaydırılabilir bir konsol elde edilir.

---

## 🛠️ Kullanılan Teknolojiler

* **İskelet ve Yapı:** HTML5
* **CSS Çatısı & Grid Sistemi:** Bootstrap 5.3 *(Modüler kartlar, form girdileri, butonlar ve tam responsive/esnek ekran uyumluluğu için)*
* **Özel Grafik & Efektler:** Custom CSS3 *(Ekranı kaplayan scanline tarama çizgileri, neon parlama efektleri, fütüristik Orbitron ve Courier New yazı tipleri)*
* **Mantık ve Dinamik Motor:** Pure JavaScript (Vanilla JS) *(Asenkron zamanlayıcılar, matematiksel algoritmalar, string analiz yöntemleri ve DOM yönetimi)*

---

## 📂 Dosya Yapısı

```text
├── index.html          # Tüm mimariyi, CSS stillerini ve JS algoritmalarını içeren ana dosya
└── README.md           # Proje dokümantasyonu ve sunum raporu

 💻 Kurulum ve Çalıştırma
Proje tamamen tarayıcı üzerinde (Client-Side) çalıştığı için herhangi bir sunucu kurulumu veya derleme işlemi gerektirmez.

1-Depoyu klonlayın:

git clone [https://github.com/azrakacar/shield-hq-panel.git](https://github.com/azrakacar/shield-hq-panel.git)

2-Klasör içerisindeki index.html dosyasına çift tıklayarak herhangi bir modern tarayıcıda doğrudan çalıştırabilirsiniz.

 📜 Lisans ve Teşekkür
Bu proje, ön yüz geliştirme, Bootstrap entegrasyonu ve JavaScript DOM manipülasyonu yeteneklerini sergilemek amacıyla üretilmiş akademik/portföy tabanlı bir simülasyon çalışmasıdır. Marvel, Avengers ve ilgili tüm karakterlerin hakları Marvel Characters, Inc. şirketine aittir.
