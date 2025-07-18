      // Declare selectedRefs at the top for admin bulk actions
      let selectedRefs = new Set();

      // Carousel logic
      const slides = document.querySelectorAll('.carousel-slide');
      const dots = document.querySelectorAll('.carousel-dot');
      let currentSlide = 0;
      function showSlide(idx) {
        slides.forEach((slide, i) => {
          slide.classList.toggle('active', i === idx);
          slide.classList.toggle('inactive', i !== idx);
        });
        dots.forEach((dot, i) => {
          dot.classList.toggle('bg-yellow-500', i === idx);
          dot.classList.toggle('bg-gray-300', i !== idx);
        });
        currentSlide = idx;
      }
      const carouselPrev = document.getElementById('carouselPrev');
      if (carouselPrev) carouselPrev.onclick = () => showSlide((currentSlide + slides.length - 1) % slides.length);
      const carouselNext = document.getElementById('carouselNext');
      if (carouselNext) carouselNext.onclick = () => showSlide((currentSlide + 1) % slides.length);
      dots.forEach(dot => { if (dot) dot.onclick = () => showSlide(Number(dot.dataset.slide)); });
      // Auto-slide
      setInterval(() => showSlide((currentSlide + 1) % slides.length), 5000);

      document.addEventListener('DOMContentLoaded', function() {
        // Cart modal logic
        const cartBtn = document.getElementById('cartBtn');
        const cartModal = document.getElementById('cartModal');
        const cartBackdrop = document.getElementById('cartBackdrop');
        const closeCart = document.getElementById('closeCart');
        if (cartBtn && cartModal && cartBackdrop && closeCart) {
          cartBtn.onclick = () => { cartModal.classList.remove('closed'); cartModal.classList.add('open'); cartBackdrop.classList.remove('hidden'); };
          closeCart.onclick = () => { cartModal.classList.add('closed'); cartModal.classList.remove('open'); cartBackdrop.classList.add('hidden'); };
          cartBackdrop.onclick = closeCart.onclick;
        }
      });

      // Service selection logic
      const serviceBtns = document.querySelectorAll('.service-btn');
      const serviceFormsSection = document.getElementById('serviceFormsSection');
      const closeServiceForm = document.getElementById('closeServiceForm');
      if (serviceBtns && serviceFormsSection && closeServiceForm) {
        serviceBtns.forEach(btn => {
          if (btn) btn.onclick = () => {
            const service = btn.dataset.service;
            showServiceForm(service);
          };
        });
        closeServiceForm.onclick = () => { serviceFormsSection.classList.add('hidden'); };
      }
      function showServiceForm(service) {
        // Responsive: use two columns on desktop, single column on mobile
        const isDesktop = window.matchMedia('(min-width: 768px)').matches;
        let leftHtml = '';
        let rightHtml = '';
        // Utility
        if (service === 'utility') {
          leftHtml = `
            <div class='flex flex-col items-center text-center mb-6'>
              <i class='fas fa-bolt text-4xl text-blue-400 mb-2'></i>
              <h2 class='text-2xl font-extrabold mb-4'>Utility Service</h2>
            </div>
            <div class='mb-4'>
              <label class='block text-blue-300 font-semibold mb-2' for='utilityType'>Utility Type <span class='text-red-400'>*</span></label>
              <select id='utilityType' class='w-64 mx-auto bg-black/40 border border-blue-400/20 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 transition' required>
                <option value=''>Select Type</option>
                <option value='electricity'>Electricity</option>
                <option value='water'>Water</option>
                <option value='wifi'>WiFi</option>
                <option value='entertainment'>Entertainment</option>
              </select>
              <div id='utilityTypeNote' class='text-xs mt-1 note-default'>Please select a utility type</div>
              <div id='utilityTypeError' class='text-xs mt-1 note-invalid hidden'></div>
            </div>
            <div class='mb-4'>
              <label class='block text-blue-300 font-semibold mb-2' for='utilityProvider'>Provider <span class='text-red-400'>*</span></label>
              <select id='utilityProvider' class='w-64 mx-auto bg-black/40 border border-blue-400/20 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 transition' required>
                <option value=''>Select Provider</option>
              </select>
              <div id='utilityProviderNote' class='text-xs mt-1 note-default'>Please select a provider</div>
              <div id='utilityProviderError' class='text-xs mt-1 note-invalid hidden'></div>
            </div>
          `;
          rightHtml = `
            <form id='utilityForm' class='space-y-6'>
              <div>
                <label class='block text-blue-300 font-semibold mb-2' for='utilityAccount'>Account Number <span class='text-red-400'>*</span></label>
                <input id='utilityAccount' type='text' maxlength='20' class='w-full bg-black/40 border border-blue-400/20 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 transition' required />
                <div id='utilityAccountNote' class='text-xs mt-1 note-default'>Enter your account number</div>
                <div id='utilityAccountError' class='text-xs mt-1 note-invalid hidden'></div>
              </div>
              <div>
                <label class='block text-blue-300 font-semibold mb-2' for='utilityAmount'>Amount (RM) <span class='text-red-400'>*</span></label>
                <input id='utilityAmount' type='number' min='10' max='1000' class='w-full bg-black/40 border border-blue-400/20 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 transition' required />
                <div id='utilityAmountNote' class='text-xs mt-1 note-default'>Enter an amount between RM10 and RM1000</div>
                <div id='utilityAmountError' class='text-xs mt-1 note-invalid hidden'></div>
              </div>
              <button type='submit' class='w-full bg-blue-500/90 hover:bg-blue-600 text-white font-bold py-3 rounded-xl text-lg shadow-xl transition' id='utilitySubmitBtn'>Add to Cart</button>
            </form>
          `;
        }
        // Prepaid
        else if (service === 'prepaid') {
          leftHtml = `
            <div class='flex flex-col items-center text-center mb-6'>
              <i class='fas fa-mobile-alt text-4xl text-blue-400 mb-2'></i>
              <h2 class='text-2xl font-extrabold mb-4'>Prepaid Top-up</h2>
            </div>
            <div class='mb-4'>
              <label class='block text-blue-300 font-semibold mb-2' for='prepaidTelco'>Telco <span class='text-red-400'>*</span></label>
              <select id='prepaidTelco' class='w-64 mx-auto bg-black/40 border border-blue-400/20 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 transition' required>
                <option value=''>Select Telco</option>
                <option value='Celcom/XPAX'>Celcom/XPAX</option>
                <option value='Maxis/Hotlink'>Maxis/Hotlink</option>
                <option value='Digi/ToneWOW'>Digi/ToneWOW</option>
                <option value='UMobile'>UMobile</option>
                <option value='TuneTalk/Halo'>TuneTalk/Halo</option>
                <option value='OneXOX/XOX'>OneXOX/XOX</option>
                <option value='RedOne'>RedOne</option>
                <option value='Yes4G'>Yes4G</option>
              </select>
              <div id='prepaidTelcoNote' class='text-xs mt-1 note-default'>Please select a telco</div>
              <div id='prepaidTelcoError' class='text-xs mt-1 note-invalid hidden'></div>
            </div>
            <div class='mb-4'>
              <label class='block text-blue-300 font-semibold mb-2' for='prepaidAmount'>Amount (RM) <span class='text-red-400'>*</span></label>
              <select id='prepaidAmount' class='w-64 mx-auto bg-black/40 border border-blue-400/20 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 transition' required>
                <option value=''>Select Amount</option>
              </select>
              <div id='prepaidAmountNote' class='text-xs mt-1 note-default'>Please select an amount</div>
              <div id='prepaidAmountError' class='text-xs mt-1 note-invalid hidden'></div>
            </div>
          `;
          rightHtml = `
            <form id='prepaidForm' class='space-y-6'>
              <div>
                <label class='block text-blue-300 font-semibold mb-2' for='prepaidPhone'>Phone Number <span class='text-red-400'>*</span></label>
                <input id='prepaidPhone' type='text' maxlength='12' class='w-full bg-black/40 border border-blue-400/20 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 transition' placeholder='012-345 6789' required />
                <div id='prepaidPhoneNote' class='text-xs mt-1 note-default'>Format: 012-345 6789</div>
                <div id='prepaidPhoneError' class='text-xs mt-1 note-invalid hidden'></div>
              </div>
              <button type='submit' class='w-full bg-blue-500/90 hover:bg-blue-600 text-white font-bold py-3 rounded-xl text-lg shadow-xl transition'>Add to Cart</button>
            </form>
          `;
        }
        // Postpaid
        else if (service === 'postpaid') {
          leftHtml = `
            <div class='flex flex-col items-center text-center mb-6'>
              <i class='fas fa-file-invoice-dollar text-4xl text-blue-400 mb-2'></i>
              <h2 class='text-2xl font-extrabold mb-4'>Postpaid Bill</h2>
            </div>
            <div class='mb-4'>
              <label class='block text-blue-300 font-semibold mb-2' for='postpaidTelco'>Telco <span class='text-red-400'>*</span></label>
              <select id='postpaidTelco' class='w-64 mx-auto bg-black/40 border border-blue-400/20 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 transition' required>
                <option value=''>Select Telco</option>
                <option value='Celcom'>Celcom</option>
                <option value='Digi'>Digi</option>
                <option value='Maxis'>Maxis</option>
                <option value='UMobile'>UMobile</option>
                <option value='OneXOX Black'>OneXOX Black</option>
                <option value='XOX'>XOX</option>
                <option value='RedOne'>RedOne</option>
                <option value='Yes4G'>Yes4G</option>
                <option value='Unifi Mobile'>Unifi Mobile</option>
              </select>
              <div id='postpaidTelcoNote' class='text-xs mt-1 note-default'>Please select a telco</div>
              <div id='postpaidTelcoError' class='text-xs mt-1 note-invalid hidden'></div>
            </div>
          `;
          rightHtml = `
            <form id='postpaidForm' class='space-y-6'>
              <div>
                <label class='block text-blue-300 font-semibold mb-2' for='postpaidPhone'>Phone Number <span class='text-red-400'>*</span></label>
                <input id='postpaidPhone' type='text' maxlength='12' class='w-full bg-black/40 border border-blue-400/20 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 transition' placeholder='012-345 6789' required />
                <div id='postpaidPhoneNote' class='text-xs mt-1 note-default'>Format: 012-345 6789</div>
                <div id='postpaidPhoneError' class='text-xs mt-1 note-invalid hidden'></div>
              </div>
              <div>
                <label class='block text-blue-300 font-semibold mb-2' for='postpaidAmount'>Bill Amount (RM) <span class='text-red-400'>*</span></label>
                <input id='postpaidAmount' type='number' min='10' max='350' class='w-full bg-black/40 border border-blue-400/20 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 transition' required />
                <div id='postpaidAmountNote' class='text-xs mt-1 note-default'>Enter bill amount (RM)</div>
                <div id='postpaidAmountError' class='text-xs mt-1 note-invalid hidden'></div>
              </div>
              <button type='submit' class='w-full bg-blue-500/90 hover:bg-blue-600 text-white font-bold py-3 rounded-xl text-lg shadow-xl transition'>Add to Cart</button>
            </form>
          `;
        }
        // Game
        else if (service === 'game') {
          leftHtml = `
            <div class='flex flex-col items-center text-center mb-6'>
              <i class='fas fa-gamepad text-4xl text-blue-400 mb-2'></i>
              <h2 class='text-2xl font-extrabold mb-4'>Game Top-up</h2>
            </div>
            <div class='mb-4'>
              <label class='block text-blue-300 font-semibold mb-2' for='gameTitle'>Game <span class='text-red-400'>*</span></label>
              <select id='gameTitle' class='w-64 mx-auto bg-black/40 border border-blue-400/20 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 transition' required>
                <option value=''>Select Game</option>
                <option value='PUBG Mobile'>PUBG Mobile</option>
                <option value='Free Fire'>Free Fire</option>
                <option value='Mobile Legends'>Mobile Legends</option>
                <option value='Genshin Impact'>Genshin Impact</option>
                <option value='Dragon Raja'>Dragon Raja</option>
                <option value='Lords Mobile'>Lords Mobile</option>
                <option value='Be The King'>Be The King</option>
                <option value='COD Mobile'>Call of Duty Mobile</option>
                <option value='Marvel SuperWar'>Marvel SuperWar</option>
                <option value='Ragnarok X: Next Generation'>Ragnarok X: Next Generation</option>
                <option value='Ragnarok Mobile: Eternal Love'>Ragnarok Mobile: Eternal Love</option>
              </select>
              <div id='gameTitleError' class='text-xs text-red-400 mt-1'></div>
            </div>
            <div class='mb-4'>
              <label class='block text-blue-300 font-semibold mb-2' for='gamePackage'>Package <span class='text-red-400'>*</span></label>
              <div id='gamePackageDiv'>
                <select id='gamePackage' class='w-64 mx-auto bg-black/40 border border-blue-400/20 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 transition' required>
                  <option value=''>Select Package</option>
                </select>
              </div>
              <div id='gamePackageError' class='text-xs text-red-400 mt-1'></div>
            </div>
          `;
          rightHtml = `
            <form id='gameForm' class='space-y-6'>
              <div id='gameIdFields'></div>
              <div>
                <label class='block text-blue-300 font-semibold mb-2' for='gameAmount'>Amount (RM)</label>
                <input id='gameAmount' type='text' class='w-full bg-black/40 border border-blue-400/20 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 transition' readonly />
              </div>
              <button type='submit' class='w-full bg-blue-500/90 hover:bg-blue-600 text-white font-bold py-3 rounded-xl text-lg shadow-xl transition'>Add to Cart</button>
            </form>
          `;
        }
        // Fallback
        else {
          leftHtml = `<div><h2 class='text-2xl md:text-3xl font-extrabold mb-6 hero-glow'>${service} Service Form</h2></div>`;
          rightHtml = `<p class='text-gray-600'>Form for ${service} will appear here.</p>`;
        }
        // Inject into modal
        if (isDesktop) {
          document.getElementById('serviceFormLeft').innerHTML = leftHtml;
          document.getElementById('serviceFormLeft').classList.remove('hidden');
          document.getElementById('serviceFormContent').innerHTML = rightHtml;
        } else {
          document.getElementById('serviceFormLeft').innerHTML = '';
          document.getElementById('serviceFormLeft').classList.add('hidden');
          document.getElementById('serviceFormContent').innerHTML = leftHtml + rightHtml;
        }
        serviceFormsSection.classList.remove('hidden');

        // --- DYNAMIC LOGIC FOR ALL FORMS ---
        // Utility dynamic provider
        if (service === 'utility') {
          const providerOptions = {
            electricity: `
              <option value="">Select Provider</option>
              <option value="tnb">Tenaga Nasional Berhad (TNB)</option>
              <option value="sabahelectricity">Sabah Electricity</option>
              <option value="sarawakenergy">Sarawak Energy</option>
              <option value="nurpower">Nur Power</option>` ,
            water: `
              <option value="">Select Provider</option>
              <option value="indahwater">Indah Water</option>
              <option value="airjohor">Air Johor (SAJ)</option>
              <option value="airkedah">Air Kedah (SADA)</option>
              <option value="airkelantan">Air Kelantan (AKSB)</option>
              <option value="airkuching">Air Kuching (KWB)</option>
              <option value="airmelaka">Air Melaka (SAMB)</option>
              <option value="airnegerisembilan">Air Negeri Sembilan (SAINS)</option>
              <option value="airpahang">Air Pahang (PAIP)</option>
              <option value="airperak">Air Perak (LAP)</option>
              <option value="airperlis">Air Perlis (SAP)</option>
              <option value="airpulaupinang">Air Pulau Pinang (PBA)</option>
              <option value="airsabah">Air Sabah (JANS)</option>
              <option value="airselangor">Air Selangor</option>
              <option value="airterengganu">Air Terengganu (SATU)</option>` ,
            wifi: `
              <option value="">Select Provider</option>
              <option value="tm_unifi">TM Unifi</option>
              <option value="tm_streamyx">TM Streamyx</option>
              <option value="time">TIME</option>` ,
            entertainment: `
              <option value="">Select Provider</option>
              <option value="astro">Astro</option>`
          };
          const utilityTypeSelect = document.getElementById('utilityType');
          const providerSelect = document.getElementById('utilityProvider');
          if (utilityTypeSelect && providerSelect) {
            utilityTypeSelect.onchange = function() {
              const type = utilityTypeSelect.value;
              providerSelect.innerHTML = providerOptions[type] || '<option value="">Select Provider</option>';
              providerSelect.value = '';
              // Reset other fields when main select changes
              const utilityAccount = document.getElementById('utilityAccount');
              const utilityAmount = document.getElementById('utilityAmount');
              if (utilityAccount) utilityAccount.value = '';
              if (utilityAmount) utilityAmount.value = '';
              providerSelect.value = '';
              // Re-validate
              if (typeof validateUtilityForm === 'function') validateUtilityForm();
            };
          }
          const utilityForm = document.getElementById('utilityForm');
          if (utilityForm) {
            utilityForm.onsubmit = function(e) {
              e.preventDefault();
              let valid = true;
              const type = document.getElementById('utilityType')?.value;
              const provider = document.getElementById('utilityProvider')?.value;
              const account = document.getElementById('utilityAccount')?.value.trim();
              const amount = document.getElementById('utilityAmount')?.value;
              const utilityTypeError = document.getElementById('utilityTypeError');
              const utilityProviderError = document.getElementById('utilityProviderError');
              const utilityAccountError = document.getElementById('utilityAccountError');
              const utilityAmountError = document.getElementById('utilityAmountError');
              if (utilityTypeError) utilityTypeError.textContent = type ? '' : 'Utility type is required.';
              if (utilityProviderError) utilityProviderError.textContent = provider ? '' : 'Provider is required.';
              if (utilityAccountError) utilityAccountError.textContent = account ? '' : 'Account number is required.';
              if (utilityAmountError) utilityAmountError.textContent = (amount && amount >= 10 && amount <= 1000) ? '' : 'Amount must be between RM10 and RM1000.';
              if (!type || !provider || !account || !amount || amount < 10 || amount > 1000) valid = false;
              if (!valid) return;
              addToCart({
                type: 'Utility',
                utilityType: type,
                provider,
                account,
                amount: parseFloat(amount)
              });
              const serviceFormsSection = document.getElementById('serviceFormsSection');
              if (serviceFormsSection) serviceFormsSection.classList.add('hidden');
              // Reset form state after submission
              if (typeof resetUtilityFormState === 'function') setTimeout(resetUtilityFormState, 0);
            };
          }
          // --- Utility form validation logic (border color only, no icons or green text) ---
          let touched = {
            utilityType: false,
            utilityProvider: false,
            utilityAccount: false,
            utilityAmount: false
          };
          function validateUtilityForm(e) {
            let valid = true;
            // Utility Type
            const type = document.getElementById('utilityType');
            const typeNote = document.getElementById('utilityTypeNote');
            const typeError = document.getElementById('utilityTypeError');
            if (!type.value) {
              setFieldState(type, typeNote, 'default', 'Please select a utility type');
              if (typeError) typeError.classList.add('hidden');
              valid = false;
            } else {
              setFieldState(type, typeNote, 'valid', 'Looks good!');
              if (typeError) typeError.classList.add('hidden');
            }
            // Provider
            const provider = document.getElementById('utilityProvider');
            const providerNote = document.getElementById('utilityProviderNote');
            const providerError = document.getElementById('utilityProviderError');
            if (!provider.value) {
              setFieldState(provider, providerNote, 'default', 'Please select a provider');
              if (providerError) providerError.classList.add('hidden');
              valid = false;
            } else {
              setFieldState(provider, providerNote, 'valid', 'Looks good!');
              if (providerError) providerError.classList.add('hidden');
            }
            // Account Number
            const account = document.getElementById('utilityAccount');
            const accountNote = document.getElementById('utilityAccountNote');
            const accountError = document.getElementById('utilityAccountError');
            if (!account.value.trim()) {
              setFieldState(account, accountNote, 'default', 'Enter your account number');
              if (accountError) accountError.classList.add('hidden');
              valid = false;
            } else {
              setFieldState(account, accountNote, 'valid', 'Looks good!');
              if (accountError) accountError.classList.add('hidden');
            }
            // Amount
            const amount = document.getElementById('utilityAmount');
            const amountNote = document.getElementById('utilityAmountNote');
            const amountError = document.getElementById('utilityAmountError');
            if (!amount.value) {
              setFieldState(amount, amountNote, 'default', 'Enter an amount between RM10 and RM1000');
              amountNote.classList.remove('hidden');
              if (amountError) amountError.classList.add('hidden');
              valid = false;
            } else if (amount.value < 10 || amount.value > 1000) {
              amountNote.classList.add('hidden');
              if (amountError) {
                setFieldState(amount, amountError, 'invalid', 'Amount must be between RM10 and RM1000.');
                amountError.textContent = 'Amount must be between RM10 and RM1000.';
                amountError.classList.remove('hidden');
              }
              valid = false;
            } else {
              setFieldState(amount, amountNote, 'valid', 'Looks good!');
              amountNote.classList.remove('hidden');
              if (amountError) amountError.classList.add('hidden');
            }
            document.getElementById('utilitySubmitBtn').disabled = !valid;
            return valid;
          }
          [
            {id: 'utilityType', key: 'utilityType'},
            {id: 'utilityProvider', key: 'utilityProvider'},
            {id: 'utilityAccount', key: 'utilityAccount'},
            {id: 'utilityAmount', key: 'utilityAmount'}
          ].forEach(f => {
            const el = document.getElementById(f.id);
            el.addEventListener('input', function(e) {
              touched[f.key] = true;
              validateUtilityForm(e);
            });
            el.addEventListener('change', function(e) {
              touched[f.key] = true;
              validateUtilityForm(e);
            });
            el.addEventListener('blur', function(e) {
              touched[f.key] = true;
              validateUtilityForm(e);
            });
          });
          // On first render, set all error notes hidden, neutral notes visible, and remove border colors
          [
            {id: 'utilityType', note: 'utilityTypeNote', error: 'utilityTypeError'},
            {id: 'utilityProvider', note: 'utilityProviderNote', error: 'utilityProviderError'},
            {id: 'utilityAccount', note: 'utilityAccountNote', error: 'utilityAccountError'},
            {id: 'utilityAmount', note: 'utilityAmountNote', error: 'utilityAmountError'}
          ].forEach(f => {
            const el = document.getElementById(f.id);
            el.classList.remove('border-red-400', 'border-green-500');
            el.style.borderColor = '';
            const err = document.getElementById(f.error);
            if (err) {
              err.textContent = '';
              err.classList.add('hidden');
            }
            const note = document.getElementById(f.note);
            if (note) note.classList.remove('hidden');
          });
          // Do not run validation on initial load
          // Add a function to reset the Utility form to its untouched state
          function resetUtilityFormState() {
            touched.utilityType = false;
            touched.utilityProvider = false;
            touched.utilityAccount = false;
            touched.utilityAmount = false;
            [
              {id: 'utilityType', note: 'utilityTypeNote', error: 'utilityTypeError'},
              {id: 'utilityProvider', note: 'utilityProviderNote', error: 'utilityProviderError'},
              {id: 'utilityAccount', note: 'utilityAccountNote', error: 'utilityAccountError'},
              {id: 'utilityAmount', note: 'utilityAmountNote', error: 'utilityAmountError'}
            ].forEach(f => {
              const el = document.getElementById(f.id);
              el.classList.remove('border-red-400', 'border-green-500');
              el.style.borderColor = '';
              const err = document.getElementById(f.error);
              if (err) {
                err.textContent = '';
                err.classList.add('hidden');
              }
              const note = document.getElementById(f.note);
              if (note) note.classList.remove('hidden');
            });
            document.getElementById('utilitySubmitBtn').disabled = true;
            validateUtilityForm();
          }
        }
        // Prepaid dynamic denominations and phone formatting
        if (service === 'prepaid') {
          const prepaidDenoms = {
            'Celcom/XPAX': [5, 10, 20, 30, 40, 50, 100],
            'Maxis/Hotlink': [5, 10, 20, 30, 50, 100],
            'Digi/ToneWOW': [5, 10, 20, 30, 40, 50, 100],
            'UMobile': [5, 10, 20, 30, 40, 50, 100],
            'TuneTalk/Halo': [5, 10, 20, 30, 50, 100],
            'OneXOX/XOX': [5, 10, 20, 30, 40, 50, 100],
            'RedOne': [10, 20, 30, 40, 50],
            'Yes4G': [5, 10, 30, 50, 100]
          };
          prepaidDenoms['RedOne'] = [10, 20, 30, 40, 50];
          prepaidDenoms['Yes4G'] = [5, 10, 30, 50, 100].filter(x => x !== 20);
          const prepaidTelco = document.getElementById('prepaidTelco');
          const prepaidAmount = document.getElementById('prepaidAmount');
          const prepaidPhone = document.getElementById('prepaidPhone');
          const prepaidForm = document.getElementById('prepaidForm');
          if (prepaidTelco && prepaidAmount && prepaidPhone && prepaidForm) {
            prepaidTelco.onchange = function() {
              const telco = prepaidTelco.value;
              prepaidAmount.innerHTML = '<option value="">Select Amount</option>';
              if (prepaidDenoms[telco]) {
                prepaidDenoms[telco].forEach(val => {
                  prepaidAmount.innerHTML += `<option value='${val}'>RM${val}</option>`;
                });
              }
              prepaidPhone.value = '';
              prepaidAmount.value = '';
              if (typeof validatePrepaidForm === 'function') validatePrepaidForm();
            };
            prepaidForm.onsubmit = function(e) {
              e.preventDefault();
              if (typeof validatePrepaidForm === 'function' && !validatePrepaidForm()) return;
              const telco = prepaidTelco.value;
              const phone = prepaidPhone.value.trim();
              const amount = prepaidAmount.value;
              addToCart({
                type: 'Prepaid',
                telco,
                phone,
                amount: parseFloat(amount)
              });
              const serviceFormsSection = document.getElementById('serviceFormsSection');
              if (serviceFormsSection) serviceFormsSection.classList.add('hidden');
            };
            prepaidPhone.oninput = function(e) {
              let value = e.target.value.replace(/[^0-9]/g, '');
              if (value.length > 3) {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + (value.length > 6 ? ' ' + value.slice(6, 10) : '');
              }
              e.target.value = value.slice(0, 12);
              if (typeof validatePrepaidForm === 'function') validatePrepaidForm();
            };
            prepaidTelco.addEventListener('input', function() { if (typeof validatePrepaidForm === 'function') validatePrepaidForm(); });
            prepaidAmount.addEventListener('input', function() { if (typeof validatePrepaidForm === 'function') validatePrepaidForm(); });
          }
        }
        // Postpaid phone formatting and validation
        if (service === 'postpaid') {
          document.getElementById('postpaidForm').onsubmit = function(e) {
            e.preventDefault();
            if (!validatePostpaidForm()) return;
            const telco = document.getElementById('postpaidTelco').value;
            const phone = document.getElementById('postpaidPhone').value.trim();
            const amount = document.getElementById('postpaidAmount').value;
            addToCart({
              type: 'Postpaid',
              telco,
              phone,
              amount: parseFloat(amount)
            });
            serviceFormsSection.classList.add('hidden');
          };
          document.getElementById('postpaidPhone').oninput = function(e) {
            let value = e.target.value.replace(/[^0-9]/g, '');
            if (value.length > 3) {
              value = value.slice(0, 3) + '-' + value.slice(3, 6) + (value.length > 6 ? ' ' + value.slice(6, 10) : '');
            }
            e.target.value = value.slice(0, 12);
            validatePostpaidForm();
          };
          document.getElementById('postpaidTelco').addEventListener('input', function() {
            // Reset other fields when main select changes
            document.getElementById('postpaidPhone').value = '';
            document.getElementById('postpaidAmount').value = '';
            validatePostpaidForm();
          });
          document.getElementById('postpaidAmount').addEventListener('input', validatePostpaidForm);
          // Validation logic for postpaid
          function validatePostpaidForm() {
            let valid = true;
            const telco = document.getElementById('postpaidTelco');
            const telcoNote = document.getElementById('postpaidTelcoNote');
            const telcoError = document.getElementById('postpaidTelcoError');
            const phone = document.getElementById('postpaidPhone');
            const phoneNote = document.getElementById('postpaidPhoneNote');
            const phoneError = document.getElementById('postpaidPhoneError');
            const amount = document.getElementById('postpaidAmount');
            const amountNote = document.getElementById('postpaidAmountNote');
            const amountError = document.getElementById('postpaidAmountError');
            // Telco
            if (!telco.value) {
              setFieldState(telco, telcoNote, 'default', 'Please select a telco');
              if (telcoError) telcoError.classList.add('hidden');
              valid = false;
            } else {
              setFieldState(telco, telcoNote, 'valid', 'Looks good!');
              if (telcoError) telcoError.classList.add('hidden');
            }
            // Phone
            if (!phone.value) {
              setFieldState(phone, phoneNote, 'default', 'Enter your phone number');
              phoneNote.classList.remove('hidden');
              if (phoneError) phoneError.classList.add('hidden');
              valid = false;
            } else if (!/^01[0-9]-\d{3} \d{4}$/.test(phone.value)) {
              phoneNote.classList.add('hidden');
              if (phoneError) {
                setFieldState(phone, phoneError, 'invalid', 'Format: 012-345 6789');
                phoneError.textContent = 'Format: 012-345 6789';
                phoneError.classList.remove('hidden');
              }
              valid = false;
            } else {
              setFieldState(phone, phoneNote, 'valid', 'Looks good!');
              phoneNote.classList.remove('hidden');
              if (phoneError) phoneError.classList.add('hidden');
            }
            // Amount
            if (!amount.value) {
              setFieldState(amount, amountNote, 'default', 'Enter bill amount (RM)');
              amountNote.classList.remove('hidden');
              if (amountError) amountError.classList.add('hidden');
              valid = false;
            } else if (amount.value < 10 || amount.value > 350) {
              amountNote.classList.add('hidden');
              if (amountError) {
                setFieldState(amount, amountError, 'invalid', 'Amount must be between RM10 and RM350.');
                amountError.textContent = 'Amount must be between RM10 and RM350.';
                amountError.classList.remove('hidden');
              }
              valid = false;
            } else {
              setFieldState(amount, amountNote, 'valid', 'Looks good!');
              amountNote.classList.remove('hidden');
              if (amountError) amountError.classList.add('hidden');
            }
            document.querySelector('#postpaidForm button[type="submit"]').disabled = !valid;
            return valid;
          }
        }
        // Game dynamic packages and ID fields
        if (service === 'game') {
          const gamePackages = {
            'Mobile Legends': ["RM1 = 14 Diamond", "RM3 = 42 Diamond", "RM5 = 70 Diamond", "RM10 = 141 Diamond", "RM20 = 281 Diamond", "RM25 = 345 Diamond", "RM30 = 415 Diamond", "RM50 = 708 Diamond", "RM100 = 1446 Diamond", "RM200 = 2976 Diamond", "RM500 = 7502 Diamond"],
            'PUBG Mobile': ["RM1 = 16 UC", "RM2 = 31 UC", "RM3 = 46 UC", "RM4 = 62 UC", "RM20 = 325 UC", "RM40 = 660 UC", "RM60 = 1037 UC", "RM100 = 1800 UC", "RM200 = 3852 UC", "RM400 = 8102 UC"],
            'Free Fire': ["RM5 = 130 Diamonds", "RM7 = 210 Diamonds", "RM10 = 260 Diamonds", "RM15 = 400 Diamonds", "RM20 = 535 Diamonds", "RM21 = 645 Diamonds", "RM30 = 800 Diamonds", "RM35 = 1080 Diamonds", "RM50 = 1350 Diamonds", "RM70 = 2200 Diamonds", "RM100 = 2800 Diamonds", "RM140 = 4450 Diamonds", "RM210 = 6900 Diamonds"],
            'COD Mobile': ["RM10 = 252 CP", "RM20 = 527 CP", "RM30 = 789 CP", "RM40 = 1053 CP", "RM50 = 1315 CP", "RM100 = 2744 CP"],
            'Genshin Impact': ["RM4 = 60 Genesis Crystals", "RM20 = 330 Genesis Crystals", "RM60 = 1090 Genesis Crystals", "RM130 = 2240 Genesis Crystals", "RM200 = 3880 Genesis Crystals", "RM400 = 8080 Genesis Crystals"],
            'Dragon Raja': ["RM5 = 76 Coupons", "RM30 = 456 Coupons", "RM50 = 820 Coupons", "RM100 = 1699 Coupons"],
            'Lords Mobile': ["RM5 = 123 Gems", "RM10 = 246 Gems", "RM30 = 737 Gems", "RM50 = 1228 Gems", "RM100 = 2455 Gems"],
            'Be The King': ["RM4 = 60 Gold", "RM20 = 300 Gold", "RM40 = 680 Gold", "RM120 = 2040 Gold"],
            'Marvel SuperWar': ["RM4 = 55 Star Credits", "RM20 = 275 Star Credits", "RM40 = 565 Star Credits", "RM80 = 1155 Star Credits", "RM130 = 1765 Star Credits"],
            'Ragnarok X: Next Generation': ["RM10 = 1280 Crystals", "RM20 = 2580 Crystals", "RM30 = 3870 Crystals", "RM40 = 5150 Crystals", "RM50 = 6450 Crystals", "RM100 = 12900 Crystals", "RM200 = 26780 Crystals"],
            'Ragnarok Mobile: Eternal Love': ["RM4 = 6 Big Cat Coins", "RM8 = 12 Big Cat Coins", "RM12 = 18 Big Cat Coins", "RM16 = 24 Big Cat Coins", "RM20 = 36 Big Cat Coins", "RM40 = 72 Big Cat Coins", "RM80 = 145 Big Cat Coins", "RM200 = 373 Big Cat Coins"]
          };
          const idLabels = {
            'Mobile Legends': 'Game ID',
            'PUBG Mobile': 'Player ID',
            'Free Fire': 'Player ID',
            'Genshin Impact': 'UID',
            'Dragon Raja': 'Character ID',
            'Lords Mobile': 'Player ID',
            'Be The King': 'Player ID',
            'COD Mobile': 'UID',
            'Marvel SuperWar': 'Player ID',
            'Ragnarok X: Next Generation': 'Character ID',
            'Ragnarok Mobile: Eternal Love': 'Character ID'
          };
          const idHelp = {
            'Mobile Legends': 'Enter your 8-10 digit Game ID',
            'PUBG Mobile': 'Enter your numeric Player ID',
            'Free Fire': 'Enter your numeric Player ID',
            'Genshin Impact': 'Enter your 9-digit UID',
            'Dragon Raja': 'Enter your Character ID',
            'Lords Mobile': 'Enter your Player ID',
            'Be The King': 'Enter your Player ID',
            'COD Mobile': 'Enter your numeric UID',
            'Marvel SuperWar': 'Enter your Player ID',
            'Ragnarok X: Next Generation': 'Enter your Character ID',
            'Ragnarok Mobile: Eternal Love': 'Enter your Character ID'
          };
          const zoneLabel = {
            'Mobile Legends': 'Zone ID',
            'Ragnarok X: Next Generation': 'Server/Zone ID',
            'Ragnarok Mobile: Eternal Love': 'Server/Zone ID'
          };
          function updateGamePackages() {
            const game = document.getElementById('gameTitle').value;
            const packageSelect = document.getElementById('gamePackage');
            packageSelect.disabled = false;
            packageSelect.innerHTML = '<option value="">Select Package</option>';
            if (gamePackages[game]) {
              gamePackages[game].forEach(pkg => {
                const opt = document.createElement('option');
                opt.value = pkg;
                opt.textContent = pkg;
                packageSelect.appendChild(opt);
              });
            }
            document.getElementById('gameAmount').value = '';
            packageSelect.value = '';
            validateGameForm();
          }
          function updateGameIdFields() {
            const game = document.getElementById('gameTitle').value;
            const container = document.getElementById('gameIdFields');
            let html = '';
            // Username (optional)
            html += `<div class='mb-6'>
              <label class='block text-blue-300 font-semibold mb-2' for='gameUsername'>In-Game Name (optional)</label>
              <input id='gameUsername' type='text' maxlength='32' placeholder='e.g. KifmanPro' class='w-full bg-black/40 border border-white rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 transition' />
            </div>`;
            // Game ID (specialized label)
            html += `<div class='mb-6'>
              <label class='block text-blue-300 font-semibold mb-2' for='gamePlayerId'>${idLabels[game] || 'Player ID'} <span class='text-red-400'>*</span></label>
              <input id='gamePlayerId' type='text' maxlength='20' class='w-full bg-black/40 border border-blue-400/20 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 transition' required />
              <div id='gamePlayerIdError' class='text-xs mt-1'></div>
            </div>`;
            // Zone/Server label (if required)
            if (
              game === 'Mobile Legends' ||
              game === 'Ragnarok X: Next Generation' ||
              game === 'Ragnarok Mobile: Eternal Love'
            ) {
              const zoneLabelText =
                game === 'Mobile Legends'
                  ? 'Zone ID'
                  : 'Server/Zone ID';
              html += `<div class='mb-6'>
                <label class='block text-blue-300 font-semibold mb-2' for='gameZoneId'>${zoneLabelText} <span class='text-red-400'>*</span></label>
                <input id='gameZoneId' type='text' maxlength='8' class='w-full bg-black/40 border border-blue-400/20 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 transition' required />
                <div id='gameZoneIdError' class='text-xs mt-1'></div>
              </div>`;
            }
            container.innerHTML = html;
            validateGameForm();
          }
          function updateGameAmount() {
            const selectedPackage = document.getElementById('gamePackage').value;
            const rmMatch = selectedPackage.match(/RM(\d+(\.\d+)?)/i);
            document.getElementById('gameAmount').value = rmMatch ? rmMatch[1] : '';
            validateGameForm();
          }
          document.getElementById('gameTitle').onchange = function() {
            updateGamePackages();
            updateGameIdFields();
          };
          document.getElementById('gamePackage').onchange = updateGameAmount;
          updateGamePackages();
          updateGameIdFields();
          // Add validation listeners
          document.getElementById('gameTitle').addEventListener('input', validateGameForm);
          document.getElementById('gamePackage').addEventListener('input', validateGameForm);
          document.getElementById('gameAmount').addEventListener('input', validateGameForm);
          // Validation logic for game form
          function validateGameForm() {
            let valid = true;
            const game = document.getElementById('gameTitle');
            const gameNote = document.getElementById('gameTitleError');
            const pkg = document.getElementById('gamePackage');
            const pkgNote = document.getElementById('gamePackageError');
            const amount = document.getElementById('gameAmount');
            // Game
            if (game && gameNote) {
              if (!game.value) {
                setFieldState(game, gameNote, 'default', 'Please select a game');
                valid = false;
              } else {
                setFieldState(game, gameNote, 'valid', 'Looks good!');
              }
            }
            // Package
            if (pkg && pkgNote) {
              if (!pkg.value) {
                setFieldState(pkg, pkgNote, 'default', 'Please select a package');
                valid = false;
              } else {
                setFieldState(pkg, pkgNote, 'valid', 'Looks good!');
              }
            }
            // Player ID
            const playerId = document.getElementById('gamePlayerId');
            const playerIdNote = document.getElementById('gamePlayerIdError');
            if (playerId && playerIdNote) {
              const val = playerId.value.trim();
              if (!val) {
                setFieldState(playerId, playerIdNote, 'default', 'Enter your player ID');
                playerIdNote.classList.remove('hidden');
                valid = false;
              } else if (game.value === 'Mobile Legends' && !/^\d{8,10}$/.test(val)) {
                setFieldState(playerId, playerIdNote, 'invalid', 'Game ID must be 8-10 digits');
                playerIdNote.classList.remove('hidden');
                valid = false;
              } else if (game.value === 'Genshin Impact' && !/^\d{9}$/.test(val)) {
                setFieldState(playerId, playerIdNote, 'invalid', 'UID must be exactly 9 digits');
                playerIdNote.classList.remove('hidden');
                valid = false;
              } else {
                setFieldState(playerId, playerIdNote, 'valid', 'Looks good!');
                playerIdNote.classList.remove('hidden');
              }
            }
            // Zone/Server ID (if present)
            const zoneId = document.getElementById('gameZoneId');
            const zoneIdNote = document.getElementById('gameZoneIdError');
            if (zoneId && zoneIdNote) {
              if (!zoneId.value) {
                setFieldState(zoneId, zoneIdNote, 'default', 'Enter your server/zone ID');
                zoneIdNote.classList.remove('hidden');
                valid = false;
              } else {
                setFieldState(zoneId, zoneIdNote, 'valid', 'Looks good!');
                zoneIdNote.classList.remove('hidden');
              }
            }
            // Amount (readonly, but still show valid if filled)
            if (amount) {
              if (!amount.value) {
                setFieldState(amount, amount, 'default', '');
                amount.classList.remove('hidden');
                valid = false;
              } else {
                setFieldState(amount, amount, 'valid', '');
                amount.classList.remove('hidden');
              }
            }
            document.querySelector('#gameForm button[type="submit"]').disabled = !valid;
            return valid;
          }
          // Add validation on input for dynamic fields
          document.addEventListener('input', function(e) {
            if (e.target && (e.target.id === 'gamePlayerId' || e.target.id === 'gameZoneId')) {
              validateGameForm();
            }
          });
          document.getElementById('gameForm').onsubmit = function(e) {
            e.preventDefault();
            if (!validateGameForm()) return;
            const game = document.getElementById('gameTitle').value;
            const pkg = document.getElementById('gamePackage').value;
            const playerId = document.getElementById('gamePlayerId').value.trim();
            const zoneId = document.getElementById('gameZoneId') ? document.getElementById('gameZoneId').value.trim() : '';
            const username = document.getElementById('gameUsername').value.trim();
            const amount = document.getElementById('gameAmount').value;
            addToCart({
              type: 'Game',
              game,
              pkg,
              playerId,
              zoneId,
              username,
              amount: parseFloat(amount)
            });
            serviceFormsSection.classList.add('hidden');
          };
        }
      }


    // Cart logic
    let cart = [];
    function addToCart(item) {
      cart.push(item);
      updateCartDisplay();
    }
    function updateCartDisplay() {
      // Update cart count
      const cartCount = document.getElementById('cartCount');
      if (cartCount) cartCount.textContent = cart.length;
      // Update cart items
      const cartItems = document.getElementById('cartItems');
      if (!cartItems) return;
      if (cart.length === 0) {
        cartItems.innerHTML = `<div class="empty-premium">
          <span style="display:flex;align-items:center;justify-content:center;margin:0 auto 10px auto;width:48px;height:48px;background:rgba(14,165,233,0.08);border-radius:50%;overflow:hidden;">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;transform:translateY(8px);">
              <rect x="7" y="11" width="18" height="12" rx="4" fill="#f8fafc" stroke="#38bdf8" stroke-width="1.2"/>
              <path d="M11 15V12.5C11 9.462 13.462 7 16.5 7C19.538 7 22 9.462 22 12.5V15" stroke="#334155" stroke-width="1.2" stroke-linecap="round"/>
              <circle cx="16" cy="19" r="1.2" fill="#38bdf8"/>
            </svg>
          </span>
          <div class="msg" style="margin-top:8px;">Your cart is empty</div>
          <div class="sub" style="margin-top:4px;">Add premium digital services</div>
          <div class="sub" style="margin-top:0px;">to your cart</div>
        </div>`;
        const cartTotal = document.getElementById('cartTotal');
        if (cartTotal) cartTotal.textContent = 'RM0.00';
        const payBtn = document.getElementById('payBtn');
        if (payBtn) payBtn.disabled = true;
        return;
      }
      let total = 0;
      cartItems.innerHTML = cart.map((item, idx) => {
        total += item.amount;
        if(item.type === 'Utility') {
          return `<div><div style='display:flex;flex-direction:column;justify-content:center;'><div class='font-semibold'>${item.type} - ${capitalize(item.utilityType)} - ${item.provider}</div><div class='text-xs'>Acc: ${item.account}</div><div class='amount-value'>RM${item.amount.toFixed(2)}</div></div><button onclick='removeCartItem(${idx})' class=''><i class='fas fa-trash'></i></button></div>`;
        }
        if(item.type === 'Prepaid') {
          return `<div><div style='display:flex;flex-direction:column;justify-content:center;'><div class='font-semibold'>${item.type} - ${item.telco}</div><div class='text-xs'>Phone: ${item.phone}</div><div class='amount-value'>RM${item.amount.toFixed(2)}</div></div><button onclick='removeCartItem(${idx})' class=''><i class='fas fa-trash'></i></button></div>`;
        }
        if(item.type === 'Postpaid') {
          return `<div><div style='display:flex;flex-direction:column;justify-content:center;'><div class='font-semibold'>${item.type} - ${item.telco}</div><div class='text-xs'>Phone: ${item.phone}</div><div class='amount-value'>RM${item.amount.toFixed(2)}</div></div><button onclick='removeCartItem(${idx})' class=''><i class='fas fa-trash'></i></button></div>`;
        }
        if(item.type === 'Game') {
          return `<div><div style='display:flex;flex-direction:column;justify-content:center;'><div class='font-semibold'>${item.type} - ${item.game}</div><div class='text-xs'>${item.pkg}</div><div class='text-xs'>ID: ${item.playerId}${item.zoneId ? ' / Zone: ' + item.zoneId : ''}${item.username ? ' / Username: ' + item.username : ''}</div><div class='amount-value'>RM${item.amount.toFixed(2)}</div></div><button onclick='removeCartItem(${idx})' class=''><i class='fas fa-trash'></i></button></div>`;
        }
        return '';
      }).join('');
      const cartTotal = document.getElementById('cartTotal');
      if (cartTotal) cartTotal.textContent = 'RM' + total.toFixed(2);
      const payBtn = document.getElementById('payBtn');
      if (payBtn) payBtn.disabled = false;
    }
    window.removeCartItem = function(idx) {
      cart.splice(idx, 1);
      updateCartDisplay();
    };
    // Show empty cart card by default on page load
    document.addEventListener('DOMContentLoaded', function() {
      updateCartDisplay();
    });

    // WhatsApp Payment Integration
    const payBtn = document.getElementById('payBtn');
    if (payBtn) {
      payBtn.onclick = function() {
        if (cart.length === 0) return;
        const paymentModal = document.getElementById('paymentModal');
        if (paymentModal) paymentModal.classList.remove('hidden');
      };
    }

    // Payment modal logic
    const closePaymentModal = document.getElementById('closePaymentModal');
    if (closePaymentModal) {
      closePaymentModal.onclick = function() {
        const paymentModal = document.getElementById('paymentModal');
        if (paymentModal) paymentModal.classList.add('hidden');
      };
    }
    let selectedPayMethod = '';
    const payMethodQR = document.getElementById('payMethodQR');
    if (payMethodQR) {
      payMethodQR.onclick = function() {
        selectedPayMethod = 'qr';
        const paymentDetails = document.getElementById('paymentDetails');
        const qrSection = document.getElementById('qrSection');
        const bankSection = document.getElementById('bankSection');
        if (paymentDetails) paymentDetails.classList.remove('hidden');
        if (qrSection) qrSection.classList.remove('hidden');
        if (bankSection) bankSection.classList.add('hidden');
      };
    }
    const payMethodBank = document.getElementById('payMethodBank');
    if (payMethodBank) {
      payMethodBank.onclick = function() {
        selectedPayMethod = 'bank';
        const paymentDetails = document.getElementById('paymentDetails');
        const qrSection = document.getElementById('qrSection');
        const bankSection = document.getElementById('bankSection');
        if (paymentDetails) paymentDetails.classList.remove('hidden');
        if (qrSection) qrSection.classList.add('hidden');
        if (bankSection) bankSection.classList.remove('hidden');
      };
    }

    // Uploadcare widget logic
    let receiptImageUrl = '';
    UPLOADCARE_PUBLIC_KEY = '64334a2b7b5bcffa332b';
    if (window.uploadcare) {
      const widget = uploadcare.Widget('#receiptUpload');
      widget.onUploadComplete(function(info) {
        receiptImageUrl = info.cdnUrl;
        const receiptPreview = document.getElementById('receiptPreview');
        if (receiptPreview) receiptPreview.innerHTML = `
          <div class='relative inline-block'>
            <img src="${receiptImageUrl}" class="w-32 mt-2 rounded shadow" alt="Receipt" />
            <span class="absolute top-1 right-1 bg-green-500 text-white rounded-full px-2 py-0.5 text-xs font-bold">✓</span>
          </div>
          <p class="text-green-600 text-sm mt-2 font-semibold text-center">Receipt uploaded!</p>
        `;
        const submitWhatsAppBtn = document.getElementById('submitWhatsAppBtn');
        if (submitWhatsAppBtn) submitWhatsAppBtn.disabled = false;
      });
      widget.onChange(function(file) {
        if (!file) {
          receiptImageUrl = '';
          const receiptPreview = document.getElementById('receiptPreview');
          if (receiptPreview) receiptPreview.innerHTML = '';
          const submitWhatsAppBtn = document.getElementById('submitWhatsAppBtn');
          if (submitWhatsAppBtn) submitWhatsAppBtn.disabled = true;
        }
      });
      widget.onUploadError = function(error) {
        const receiptPreview = document.getElementById('receiptPreview');
        if (receiptPreview) receiptPreview.innerHTML = `<p class='text-red-600 text-sm font-bold' aria-live='assertive'>Upload failed: ${error.message || 'Unknown error'}</p>`;
        const submitWhatsAppBtn = document.getElementById('submitWhatsAppBtn');
        if (submitWhatsAppBtn) submitWhatsAppBtn.disabled = true;
      };
    }

    // SheetDB API endpoint and column mapping
    const SHEETDB_API = 'https://sheetdb.io/api/v1/enqljk0i6rbgo';
    const COL_REF = 'Reference Number';
    const COL_STATUS = 'Status';
    const COL_CREATED = 'Created On';
    const COL_TOTAL = 'Total';
    const COL_RECEIPT = 'Receipt';
    const COL_ITEMS = 'Items';
    // Add Notes column mapping
    const COL_NOTES = 'Notes';

    // Helper: POST new order
    async function postOrderToSheet(order) {
      const payload = {};
      payload[COL_REF] = order.ref;
      payload[COL_STATUS] = order.status;
      payload[COL_CREATED] = order.created;
      payload[COL_TOTAL] = order.total;
      payload[COL_RECEIPT] = order.receipt;
      payload[COL_ITEMS] = JSON.stringify(order.items);
      const res = await fetch(SHEETDB_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [payload] })
      });
      return res.ok;
    }
    // Helper: GET order by reference
    async function getOrderByRef(ref) {
      const res = await fetch(`${SHEETDB_API}/search?${encodeURIComponent(COL_REF)}=${encodeURIComponent(ref)}`);
      if (!res.ok) return null;
      const data = await res.json();
      return data && data.length ? data[0] : null;
    }
    // Helper: GET all orders
    async function getAllOrdersSheet() {
      const res = await fetch(SHEETDB_API);
      if (!res.ok) return [];
      const data = await res.json();
      return data;
    }
    // Helper: PATCH order status by reference
    async function patchOrderStatus(ref, newStatus) {
      const payload = {};
      payload[COL_STATUS] = newStatus;
      const res = await fetch(`${SHEETDB_API}/${COL_REF}/${encodeURIComponent(ref)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [payload] })
      });
      return res.ok;
    }

    // WhatsApp submission after receipt upload
    const submitWhatsAppBtn = document.getElementById('submitWhatsAppBtn');
    if (submitWhatsAppBtn) {
      submitWhatsAppBtn.onclick = async function() {
        if (!receiptImageUrl) {
          const receiptPreview = document.getElementById('receiptPreview');
          if (receiptPreview) receiptPreview.innerHTML = '<p class="text-red-600 text-sm">Please upload your receipt before submitting.</p>';
          return;
        }
        // Generate reference number
        const now = new Date();
        const ref = 'KIF-' + now.getFullYear() + (now.getMonth()+1).toString().padStart(2,'0') + now.getDate().toString().padStart(2,'0') + '-' + Math.floor(1000 + Math.random()*9000);
        // Format order summary
        let message = `Order Reference: ${ref}\n`;
        let total = 0;
        cart.forEach((item, idx) => {
          message += `\n${idx+1}. ${item.type}\n`;
          if(item.type === 'Utility') {
            message += `Type: ${capitalize(item.utilityType)}\nProvider: ${item.provider}\nAccount: ${item.account}\nAmount: RM${item.amount.toFixed(2)}\n`;
          } else if(item.type === 'Prepaid') {
            message += `Telco: ${item.telco}\nPhone: ${item.phone}\nAmount: RM${item.amount.toFixed(2)}\n`;
          } else if(item.type === 'Postpaid') {
            message += `Telco: ${item.telco}\nPhone: ${item.phone}\nAmount: RM${item.amount.toFixed(2)}\n`;
          } else if(item.type === 'Game') {
            message += `Game: ${item.game}\nPackage: ${item.pkg}\nID: ${item.playerId}`;
            if(item.zoneId) message += ` / Zone: ${item.zoneId}`;
            if(item.username) message += ` / Username: ${item.username}`;
            message += `\nAmount: RM${item.amount.toFixed(2)}\n`;
          }
          total += item.amount;
        });
        message += `\nTotal: RM${total.toFixed(2)}\n`;
        message += `\nReceipt: ${receiptImageUrl}\n`;
        message += `\nThank you for your order!`;
        // WhatsApp number (change to your business number)
        const waNumber = '60194761092';
        // Save order to Google Sheets
        const orderObj = {
          ref,
          items: JSON.parse(JSON.stringify(cart)),
          total,
          receipt: receiptImageUrl,
          status: 'Pending',
          created: now.toISOString()
        };
        document.getElementById('submitWhatsAppBtn').disabled = true;
        document.getElementById('submitWhatsAppBtn').textContent = 'Submitting...';
        try {
          await postOrderToSheet(orderObj);
        } catch (e) {
          alert('Failed to save order. Please try again.');
          document.getElementById('submitWhatsAppBtn').disabled = false;
          document.getElementById('submitWhatsAppBtn').textContent = 'Submit via WhatsApp';
          return;
        }
        document.getElementById('submitWhatsAppBtn').disabled = false;
        document.getElementById('submitWhatsAppBtn').textContent = 'Submit via WhatsApp';
        // Open WhatsApp with pre-filled message
        window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank');
        // Show confirmation modal
        showConfirmationModal(ref);
        document.getElementById('paymentModal').classList.add('hidden');
      };
    }

    // Confirmation modal logic
    function showConfirmationModal(ref) {
      if (!document.getElementById('confirmationModal')) {
        const modal = document.createElement('div');
        modal.id = 'confirmationModal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50';
        modal.innerHTML = `
          <div class="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
            <h3 class="text-xl font-bold mb-2 text-green-700">Order Sent!</h3>
            <div class="mb-2 text-sm text-gray-700">Reference: <span class="font-bold text-gray-900">${ref}</span></div>
            <p class="mb-4 text-gray-700">Your order has been sent via WhatsApp. We will process your order soon.</p>
            <button onclick="document.getElementById('confirmationModal').remove()" class="bg-green-600 text-white px-6 py-2 rounded-xl font-semibold shadow hover:bg-green-700 transition">OK</button>
          </div>
        `;
        document.body.appendChild(modal);
      }
    }

    // Order Tracking logic (SheetDB version)
    const trackOrderBtn = document.getElementById('trackOrderBtn');
    if (trackOrderBtn) {
      trackOrderBtn.onclick = function() {
        const trackOrderModal = document.getElementById('trackOrderModal');
        const trackOrderResult = document.getElementById('trackOrderResult');
        const trackRef = document.getElementById('trackRef');
        if (trackOrderModal) trackOrderModal.classList.remove('hidden');
        if (trackOrderResult) trackOrderResult.textContent = '';
        if (trackRef) trackRef.value = '';
      };
    }
    const closeTrackOrderModal = document.getElementById('closeTrackOrderModal');
    if (closeTrackOrderModal) {
      closeTrackOrderModal.onclick = function() {
        const trackOrderModal = document.getElementById('trackOrderModal');
        if (trackOrderModal) trackOrderModal.classList.add('hidden');
      };
    }
    const trackOrderForm = document.getElementById('trackOrderForm');
    if (trackOrderForm) {
      trackOrderForm.onsubmit = async function(e) {
        e.preventDefault();
        const trackRef = document.getElementById('trackRef');
        const resultDiv = document.getElementById('trackOrderResult');
        if (!trackRef || !resultDiv) return;
        const ref = trackRef.value.trim();
        if (!ref) {
          resultDiv.textContent = '';
          return;
        }
        resultDiv.innerHTML = '<span class="text-gray-500">Loading...</span>';
        const order = await getOrderByRef(ref);
        if (order) {
          // Shopee-style stepper
          const statusSteps = ['Pending', 'In Progress', 'Completed'];
          const currentIdx = statusSteps.indexOf(order[COL_STATUS]);
          let stepper = `<div class='flex justify-between items-center mb-6 mt-2'>`;
          statusSteps.forEach((step, idx) => {
            const active = idx <= currentIdx;
            stepper += `
              <div class='flex-1 flex flex-col items-center'>
                <div class='w-8 h-8 flex items-center justify-center rounded-full font-bold text-lg ${active ? 'bg-yellow-500 text-white shadow-lg' : 'bg-gray-200 text-gray-400'}'>${idx+1}</div>
                <div class='mt-2 text-xs font-semibold ${active ? 'text-yellow-700' : 'text-gray-400'}'>${step}</div>
              </div>
              ${idx < statusSteps.length-1 ? `<div class='flex-1 h-1 ${idx < currentIdx ? 'bg-yellow-400' : 'bg-gray-200'}'></div>` : ''}
            `;
          });
          stepper += `</div>`;
          // Order details
          let details = `<div class='bg-gray-50 rounded-xl p-4 mb-2 shadow-sm'>
            <div class='text-xs text-gray-500 mb-1'>Order placed: ${new Date(order[COL_CREATED]).toLocaleString()}</div>
            <div class='font-mono text-sm mb-1'><b>Reference:</b> ${order[COL_REF]}</div>
            <div class='text-sm mb-1'><b>Status:</b> <span class='font-semibold text-yellow-700'>${order[COL_STATUS]}</span></div>
            <div class='text-sm mb-1'><b>Total:</b> RM${Number(order[COL_TOTAL]).toFixed(2)}</div>
            <div class='text-sm mb-1'><b>Receipt:</b> <a href='${order[COL_RECEIPT]}' target='_blank' class='text-blue-600 underline'>View</a></div>
            <div class='text-xs text-gray-700 mt-2'><b>Items:</b><ul class='list-disc ml-5 mt-1'>`;
          try {
            const items = JSON.parse(order[COL_ITEMS]);
            items.forEach((item, idx) => {
              details += `<li>${item.type} - ${item.game||item.telco||item.provider||''} RM${item.amount.toFixed(2)}</li>`;
            });
          } catch {}
          details += '</ul></div></div>';
          resultDiv.innerHTML = stepper + details;
          // In order tracking logic, after showing stepper and details, add:
          details += `<div class='mt-4 flex justify-end'><button id='trackViewDetailsBtn' class='main-btn main-btn-outline-yellow'>View Details</button></div>`;
          resultDiv.innerHTML = stepper + details;
          // Add event listener for details button
          setTimeout(()=>{
            const btn = document.getElementById('trackViewDetailsBtn');
            if (btn) btn.onclick = ()=>window.showOrderDetailsSheet(order[COL_REF], false);
          }, 0);
        } else {
          resultDiv.innerHTML = "<span class='text-red-600'>Order not found. Please check your reference number.</span>";
        }
      };
    }

    // Admin Panel logic (SheetDB version)
    // Hamburger Menu Drawer logic
    const adminMenuBtn = document.getElementById('adminMenuBtn');
    if (adminMenuBtn) {
      adminMenuBtn.onclick = function() {
        const adminMenuDrawer = document.getElementById('adminMenuDrawer');
        const adminMenuDrawerBackdrop = document.getElementById('adminMenuDrawerBackdrop');
        const adminMenuDrawerContent = document.getElementById('adminMenuDrawerContent');
        if (adminMenuDrawer) adminMenuDrawer.classList.remove('pointer-events-none');
        if (adminMenuDrawer) adminMenuDrawer.classList.add('pointer-events-auto');
        if (adminMenuDrawerBackdrop) adminMenuDrawerBackdrop.classList.remove('opacity-0','pointer-events-none');
        if (adminMenuDrawerBackdrop) adminMenuDrawerBackdrop.classList.add('opacity-100');
        if (adminMenuDrawerContent) adminMenuDrawerContent.classList.remove('-translate-x-full');
        if (adminMenuDrawerContent) adminMenuDrawerContent.classList.add('translate-x-0');
      };
    }
    const closeAdminMenuDrawer = document.getElementById('closeAdminMenuDrawer');
    if (closeAdminMenuDrawer) {
      closeAdminMenuDrawer.onclick = closeAdminMenuDrawerFunc;
    }
    const adminMenuDrawerBackdrop = document.getElementById('adminMenuDrawerBackdrop');
    if (adminMenuDrawerBackdrop) {
      adminMenuDrawerBackdrop.onclick = closeAdminMenuDrawerFunc;
    }
    function closeAdminMenuDrawerFunc() {
      const adminMenuDrawer = document.getElementById('adminMenuDrawer');
      const adminMenuDrawerBackdrop = document.getElementById('adminMenuDrawerBackdrop');
      const adminMenuDrawerContent = document.getElementById('adminMenuDrawerContent');
      if (adminMenuDrawer) adminMenuDrawer.classList.add('pointer-events-none');
      if (adminMenuDrawer) adminMenuDrawer.classList.remove('pointer-events-auto');
      if (adminMenuDrawerBackdrop) adminMenuDrawerBackdrop.classList.add('opacity-0','pointer-events-none');
      if (adminMenuDrawerBackdrop) adminMenuDrawerBackdrop.classList.remove('opacity-100');
      if (adminMenuDrawerContent) adminMenuDrawerContent.classList.add('-translate-x-full');
      if (adminMenuDrawerContent) adminMenuDrawerContent.classList.remove('translate-x-0');
    }
    // Admin Panel navigation
    const openAdminPanelBtn = document.getElementById('openAdminPanelBtn');
    if (openAdminPanelBtn) {
      openAdminPanelBtn.onclick = async function() {
        closeAdminMenuDrawerFunc();
        const pass = prompt('Enter admin password:');
        if (pass !== 'admin123') { alert('Incorrect password.'); return; }
        await renderAdminOrdersSheet();
        const adminPanelPage = document.getElementById('adminPanelPage');
        if (adminPanelPage) adminPanelPage.classList.remove('hidden');
        // Hide main UI
        document.querySelector('main')?.classList?.add('hidden');
        document.querySelector('header')?.classList?.add('hidden');
        document.querySelector('nav')?.classList?.add('hidden');
      };
    }
    const backToShopBtn = document.getElementById('backToShopBtn');
    if (backToShopBtn) {
      backToShopBtn.onclick = function() {
        const adminPanelPage = document.getElementById('adminPanelPage');
        if (adminPanelPage) adminPanelPage.classList.add('hidden');
        document.querySelector('main')?.classList?.remove('hidden');
        document.querySelector('header')?.classList?.remove('hidden');
        document.querySelector('nav')?.classList?.remove('hidden');
      };
    }
    async function renderAdminOrdersSheet() {
      const orders = await getAllOrdersSheet();
      if (!orders.length) {
        document.getElementById('adminOrdersList').innerHTML = '<div class="text-center text-gray-500">No orders found.</div>';
        return;
      }
      // Controls
      let controls = document.getElementById('adminPanelControls')?.content.cloneNode(true);
      document.getElementById('adminOrdersList').innerHTML = '';
      document.getElementById('adminOrdersList').appendChild(controls);
      // State
      let search = '';
      let filter = '';
      let sort = 'date_desc';
      let page = 1;
      const perPage = 10;
      // Filtering/sorting logic
      function getFilteredSortedOrders() {
        let filtered = orders.slice();
        if (search) filtered = filtered.filter(o => (o[COL_REF]||'').toLowerCase().includes(search.toLowerCase()));
        if (filter) filtered = filtered.filter(o => o[COL_STATUS] === filter);
        if (sort === 'date_desc') filtered.sort((a,b) => new Date(b[COL_CREATED]) - new Date(a[COL_CREATED]));
        if (sort === 'date_asc') filtered.sort((a,b) => new Date(a[COL_CREATED]) - new Date(b[COL_CREATED]));
        if (sort === 'status') filtered.sort((a,b) => (a[COL_STATUS]||'').localeCompare(b[COL_STATUS]||''));
        if (sort === 'total_desc') filtered.sort((a,b) => Number(b[COL_TOTAL]) - Number(a[COL_TOTAL]));
        if (sort === 'total_asc') filtered.sort((a,b) => Number(a[COL_TOTAL]) - Number(b[COL_TOTAL]));
        return filtered;
      }
      // At the top of admin logic (before renderTable)
      function renderTable() {
        let filtered = getFilteredSortedOrders();
        let totalPages = Math.max(1, Math.ceil(filtered.length/perPage));
        if (page > totalPages) page = totalPages;
        let paged = filtered.slice((page-1)*perPage, page*perPage);
        // Track selected orders
        // Bulk actions bar
        function renderBulkBar() {
          let bar = document.getElementById('adminBulkBar');
          if (!bar) {
            bar = document.createElement('div');
            bar.id = 'adminBulkBar';
            bar.className = 'fixed top-20 left-0 w-full bg-yellow-100 border-b border-yellow-300 z-50 flex items-center gap-4 px-6 py-2 shadow-md';
            bar.innerHTML = `
              <span id='bulkCount' class='font-semibold'></span>
              <button id='bulkStatusPending' class='main-btn main-btn-outline-yellow'>Set Pending</button>
              <button id='bulkStatusInProgress' class='main-btn main-btn-outline-yellow'>Set In Progress</button>
              <button id='bulkStatusCompleted' class='main-btn main-btn-outline-yellow'>Set Completed</button>
              <button id='bulkArchive' class='main-btn main-btn-outline-yellow'>Archive</button>
              <button id='bulkDelete' class='main-btn main-btn-outline-red'>Delete</button>
              <button id='bulkClear' class='main-btn main-btn-outline-gray'>Clear</button>
            `;
            document.body.appendChild(bar);
          }
          bar.classList.remove('hidden');
          document.getElementById('bulkCount').textContent = `${selectedRefs.size} selected`;
          document.getElementById('bulkClear').onclick = ()=>{selectedRefs.clear(); renderTable();};
          document.getElementById('bulkStatusPending').onclick = ()=>bulkUpdateStatus('Pending');
          document.getElementById('bulkStatusInProgress').onclick = ()=>bulkUpdateStatus('In Progress');
          document.getElementById('bulkStatusCompleted').onclick = ()=>bulkUpdateStatus('Completed');
          document.getElementById('bulkArchive').onclick = ()=>bulkArchive();
          document.getElementById('bulkDelete').onclick = ()=>bulkDelete();
        }
        function hideBulkBar() {
          let bar = document.getElementById('adminBulkBar');
          if (bar) bar.classList.add('hidden');
        }
        // Table with checkboxes
        let html = `<table class='min-w-full text-xs'><thead><tr>
          <th class='px-2 py-1'><input type='checkbox' id='selectAllOrders'></th>
          <th class='px-2 py-1'>Ref</th><th class='px-2 py-1'>Status</th><th class='px-2 py-1'>Total</th><th class='px-2 py-1'>Created</th><th class='px-2 py-1'>Action</th></tr></thead><tbody>`;
        paged.forEach(order => {
          const archivedClass = order[COL_STATUS]==='Archived' ? 'opacity-50 italic' : '';
          html += `<tr class='${archivedClass}'>
            <td class='border px-2 py-1'><input type='checkbox' class='orderRowCheckbox' data-ref='${order[COL_REF]}'></td>
            <td class='border px-2 py-1 font-mono'>${order[COL_REF]}</td>
            <td class='border px-2 py-1'>
              <select data-ref='${order[COL_REF]}' class='admin-status-select border rounded px-1 py-0.5'>
                <option value='Pending' ${order[COL_STATUS]==='Pending'?'selected':''}>Pending</option>
                <option value='In Progress' ${order[COL_STATUS]==='In Progress'?'selected':''}>In Progress</option>
                <option value='Completed' ${order[COL_STATUS]==='Completed'?'selected':''}>Completed</option>
                <option value='Archived' ${order[COL_STATUS]==='Archived'?'selected':''}>Archived</option>
              </select>
            </td>
            <td class='border px-2 py-1'>RM${Number(order[COL_TOTAL]).toFixed(2)}</td>
            <td class='border px-2 py-1'>${new Date(order[COL_CREATED]).toLocaleString()}</td>
            <td class='border px-2 py-1 flex gap-1'>
              <button class='text-blue-600 underline' onclick='window.showOrderDetailsSheet("${order[COL_REF]}", true)'>Details</button>
              <button class='text-yellow-600 underline' onclick='window.archiveOrder("${order[COL_REF]}")'>Archive</button>
              <button class='text-red-600 underline' onclick='window.deleteOrder(this.getAttribute("data-ref"))' data-ref='${order[COL_REF]}'>Delete</button>
            </td>
          </tr>`;
        });
        html += '</tbody></table>';
        // Pagination controls
        html += `<div class='flex justify-between items-center mt-4'>
          <button class='main-btn main-btn-outline-yellow' ${page===1?'disabled':''} id='adminPrevPageBtn'>&larr; Prev</button>
          <span class='text-xs text-gray-600'>Page ${page} of ${totalPages}</span>
          <button class='main-btn main-btn-outline-yellow' ${page===totalPages?'disabled':''} id='adminNextPageBtn'>Next &rarr;</button>
        </div>`;
        document.getElementById('adminOrdersList').querySelector('table')?.remove();
        document.getElementById('adminOrdersList').querySelector('div.flex.justify-between')?.remove();
        document.getElementById('adminOrdersList').insertAdjacentHTML('beforeend', html);
        // Checkbox logic
        const checkboxes = document.querySelectorAll('.orderRowCheckbox');
        checkboxes.forEach(cb => {
          cb.checked = selectedRefs.has(cb.getAttribute('data-ref'));
          cb.onchange = function() {
            const ref = this.getAttribute('data-ref');
            if (this.checked) selectedRefs.add(ref); else selectedRefs.delete(ref);
            if (selectedRefs.size) renderBulkBar(); else hideBulkBar();
          };
        });
        // Select all
        const selectAll = document.getElementById('selectAllOrders');
        if (selectAll) {
          selectAll.checked = paged.every(o => selectedRefs.has(o[COL_REF]));
          selectAll.onchange = function() {
            paged.forEach(o => {
              if (this.checked) selectedRefs.add(o[COL_REF]); else selectedRefs.delete(o[COL_REF]);
            });
            checkboxes.forEach(cb => { cb.checked = selectedRefs.has(cb.getAttribute('data-ref')); });
            if (selectedRefs.size) renderBulkBar(); else hideBulkBar();
          };
        }
        // Bulk actions
        async function bulkUpdateStatus(status) {
          for (let ref of selectedRefs) {
            if (typeof ref !== 'string') { console.warn('Skipping non-string ref in bulkUpdateStatus:', ref); continue; }
            await patchOrderStatus(ref, status);
          }
          selectedRefs.clear();
          hideBulkBar();
          await renderAdminOrdersSheet();
        }
        async function bulkArchive() {
          for (let ref of selectedRefs) {
            if (typeof ref !== 'string') { console.warn('Skipping non-string ref in bulkArchive:', ref); continue; }
            await patchOrderStatus(ref, 'Archived');
          }
          selectedRefs.clear();
          hideBulkBar();
          await renderAdminOrdersSheet();
        }
        async function bulkDelete() {
          for (let ref of selectedRefs) {
            if (typeof ref !== 'string') { console.warn('Skipping non-string ref in bulkDelete:', ref); continue; }
            await fetch(`${SHEETDB_API}/${COL_REF}/${encodeURIComponent(ref)}`, { method: 'DELETE' });
          }
          selectedRefs.clear();
          hideBulkBar();
          await renderAdminOrdersSheet();
        }
        // ... existing code ...
      }
      // Controls listeners
      setTimeout(()=>{
        document.getElementById('adminSearchInput').oninput = function(e){ search = e.target.value; page=1; renderTable(); };
        document.getElementById('adminStatusFilter').onchange = function(e){ filter = e.target.value; page=1; renderTable(); };
        document.getElementById('adminSort').onchange = function(e){ sort = e.target.value; page=1; renderTable(); };
      }, 0);
      renderTable();
    }
    // Show order details (global for onclick)
    window.showOrderDetailsSheet = async function(ref, isAdmin) {
      const order = await getOrderByRef(ref);
      if (!order) return alert('Order not found.');
      // Show modal
      const modal = document.getElementById('orderDetailsModal');
      const content = document.getElementById('orderDetailsContent');
      modal.classList.remove('hidden');
      // Receipt preview
      let receiptHtml = order[COL_RECEIPT] ? `<a href='${order[COL_RECEIPT]}' target='_blank' class='text-blue-600 underline'>View</a><br><img src='${order[COL_RECEIPT]}' alt='Receipt' class='mt-2 rounded shadow max-h-40'/>` : '<span class="text-gray-400">No receipt uploaded</span>';
      // Notes (admin can edit)
      let notes = order.Notes || '';
      let notesHtml = isAdmin
        ? `<textarea id='orderNotesInput' class='w-full border rounded-lg px-3 py-2 mt-2' rows='2' placeholder='Add notes...'>${notes}</textarea><button id='saveOrderNotesBtn' class='main-btn main-btn-outline-yellow mt-2'>Save Notes</button>`
        : `<div class='text-gray-700 mt-2'><b>Notes:</b> <span>${notes ? notes : '<span class="text-gray-400">No notes</span>'}</span></div>`;
      // Copy ref button
      let copyBtn = `<button id='copyOrderRefBtn' class='main-btn main-btn-outline-yellow text-xs ml-2'>Copy Ref</button>`;
      // Details
      let html = `<div class='text-left text-sm mb-2'>
        <b>Reference:</b> <span id='orderRefText'>${order[COL_REF]}</span> ${copyBtn}<br>
        <b>Status:</b> ${order[COL_STATUS]}<br>
        <b>Total:</b> RM${Number(order[COL_TOTAL]).toFixed(2)}<br>
        <b>Created:</b> ${new Date(order[COL_CREATED]).toLocaleString()}<br>
        <b>Receipt:</b> ${receiptHtml}
      </div>`;
      html += '<div class="text-xs text-gray-700"><b>Items:</b><ul>';
      try {
        const items = JSON.parse(order[COL_ITEMS]);
        items.forEach((item, idx) => {
          html += `<li>${idx+1}. ${item.type} - ${item.game||item.telco||item.provider||''} RM${item.amount.toFixed(2)}</li>`;
        });
      } catch {}
      html += '</ul></div>';
      html += notesHtml;
      content.innerHTML = html;
      // Copy ref logic
      document.getElementById('copyOrderRefBtn').onclick = function() {
        navigator.clipboard.writeText(order[COL_REF]);
        this.textContent = 'Copied!';
        setTimeout(()=>{this.textContent='Copy Ref';}, 1200);
      };
      // Save notes (admin)
      if (isAdmin) {
        document.getElementById('saveOrderNotesBtn').onclick = async function() {
          const newNotes = document.getElementById('orderNotesInput').value;
          // Try PATCH to SheetDB (if Notes column exists)
          try {
            await fetch(`${SHEETDB_API}/${COL_REF}/${encodeURIComponent(order[COL_REF])}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ Notes: newNotes })
            });
            alert('Notes saved!');
            modal.classList.add('hidden');
          } catch {
            alert('Failed to save notes.');
          }
        };
      }
      // Add Archive and Delete buttons
      if (isAdmin) {
        content.innerHTML += `<div class='flex gap-2 mt-4'><button id='orderArchiveBtn' class='main-btn main-btn-outline-yellow'>Archive</button><button id='orderDeleteBtn' class='main-btn main-btn-outline-red'>Delete</button></div>`;
        document.getElementById('orderArchiveBtn').onclick = async function() {
          await patchOrderStatus(order[COL_REF], 'Archived');
          alert('Order archived!');
          modal.classList.add('hidden');
          await renderAdminOrdersSheet();
        };
        document.getElementById('orderDeleteBtn').onclick = async function() {
          if (!confirm('Delete this order?')) return;
          await fetch(`${SHEETDB_API}/${COL_REF}/${encodeURIComponent(order[COL_REF])}`, { method: 'DELETE' });
          alert('Order deleted!');
          modal.classList.add('hidden');
          await renderAdminOrdersSheet();
        };
      }
    }
    // Modal close logic
    const closeOrderDetailsModal = document.getElementById('closeOrderDetailsModal');
    if (closeOrderDetailsModal) closeOrderDetailsModal.onclick = function() {
      document.getElementById('orderDetailsModal').classList.add('hidden');
    };

    // Helper function
    function capitalize(str) {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Add global functions for row buttons
    window.archiveOrder = async function(ref) {
      console.log('archiveOrder ref:', ref, typeof ref);
      if (typeof ref !== 'string') { alert('Invalid reference number for archive.'); return; }
      await patchOrderStatus(ref, 'Archived');
      await renderAdminOrdersSheet();
    }
    window.deleteOrder = async function(ref) {
      console.log('deleteOrder ref:', ref, typeof ref);
      if (typeof ref !== 'string') { alert('Invalid reference number for delete.'); return; }
      if (!confirm('Delete this order?')) return;
      await fetch(`${SHEETDB_API}/${COL_REF}/${encodeURIComponent(ref)}`, { method: 'DELETE' });
      await renderAdminOrdersSheet();
    }
    document.querySelectorAll('.amount-btn-up').forEach(btn => {
      btn.onclick = function() {
        const input = document.getElementById(this.dataset.target);
        if (!input) return;
        let val = parseFloat(input.value) || 0;
        let max = parseFloat(input.max) || 999999;
        let step = parseFloat(input.step) || 1;
        if (val + step <= max) input.value = val + step;
        input.dispatchEvent(new Event('input'));
      };
    });
    document.querySelectorAll('.amount-btn-down').forEach(btn => {
      btn.onclick = function() {
        const input = document.getElementById(this.dataset.target);
        if (!input) return;
        let val = parseFloat(input.value) || 0;
        let min = parseFloat(input.min) || 0;
        let step = parseFloat(input.step) || 1;
        if (val - step >= min) input.value = val - step;
        input.dispatchEvent(new Event('input'));
      };
    });

    // Add a function to reset the Utility form to its untouched state
    function resetUtilityFormState() {
      if (!touched) return;
      touched.utilityType = false;
      touched.utilityProvider = false;
      touched.utilityAccount = false;
      touched.utilityAmount = false;
      [
        {id: 'utilityType', note: 'utilityTypeNote', error: 'utilityTypeError'},
        {id: 'utilityProvider', note: 'utilityProviderNote', error: 'utilityProviderError'},
        {id: 'utilityAccount', note: 'utilityAccountNote', error: 'utilityAccountError'},
        {id: 'utilityAmount', note: 'utilityAmountNote', error: 'utilityAmountError'}
      ].forEach(f => {
        const el = document.getElementById(f.id);
        el.classList.remove('border-red-400', 'border-green-500');
        el.style.borderColor = '';
        const err = document.getElementById(f.error);
        if (err) {
          err.textContent = '';
          err.classList.add('hidden');
        }
        const note = document.getElementById(f.note);
        if (note) note.classList.remove('hidden');
      });
      document.getElementById('utilitySubmitBtn').disabled = true;
      // Call validateUtilityForm to update UI
      if (typeof validateUtilityForm === 'function') validateUtilityForm();
    }

    // --- Add this helper function for all forms (move to top of script) ---
    function setFieldState(input, note, state, message = '') {
      if (input) input.classList.remove('input-default', 'input-valid', 'input-invalid');
      if (note) note.classList.remove('note-default', 'note-valid', 'note-invalid');
      if (state === 'default') {
        if (input) input.classList.add('input-default');
        if (note) {
          note.classList.add('note-default');
          note.textContent = message;
        }
      } else if (state === 'valid') {
        if (input) input.classList.add('input-valid');
        if (note) {
          note.classList.add('note-valid');
          note.textContent = message;
        }
      } else if (state === 'invalid') {
        if (input) input.classList.add('input-invalid');
        if (note) {
          note.classList.add('note-invalid');
          note.textContent = message;
        }
      }
    }

    // Example for game dynamic packages and ID fields
    const gameForm = document.getElementById('gameForm');
    const gameTitle = document.getElementById('gameTitle');
    const gamePackage = document.getElementById('gamePackage');
    const gameAmount = document.getElementById('gameAmount');
    if (gameForm && gameTitle && gamePackage && gameAmount) {
      gameTitle.onchange = function() {
        if (typeof updateGamePackages === 'function') updateGamePackages();
        if (typeof updateGameIdFields === 'function') updateGameIdFields();
      };
      gamePackage.onchange = function() {
        if (typeof updateGameAmount === 'function') updateGameAmount();
      };
      gameTitle.addEventListener('input', function() { if (typeof validateGameForm === 'function') validateGameForm(); });
      gamePackage.addEventListener('input', function() { if (typeof validateGameForm === 'function') validateGameForm(); });
      gameAmount.addEventListener('input', function() { if (typeof validateGameForm === 'function') validateGameForm(); });
      gameForm.onsubmit = function(e) {
        e.preventDefault();
        if (typeof validateGameForm === 'function' && !validateGameForm()) return;
        const game = gameTitle.value;
        const pkg = gamePackage.value;
        const playerId = document.getElementById('gamePlayerId')?.value.trim();
        const zoneId = document.getElementById('gameZoneId') ? document.getElementById('gameZoneId').value.trim() : '';
        const username = document.getElementById('gameUsername')?.value.trim();
        const amount = gameAmount.value;
        addToCart({
          type: 'Game',
          game,
          pkg,
          playerId,
          zoneId,
          username,
          amount: parseFloat(amount)
        });
        const serviceFormsSection = document.getElementById('serviceFormsSection');
        if (serviceFormsSection) serviceFormsSection.classList.add('hidden');
      };
    }