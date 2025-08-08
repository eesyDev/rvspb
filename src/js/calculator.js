(function () {
    function getPanelForService(input) {
      const wrap = input.closest('.switch-wrapper');
      if (!wrap) return null;
  
      const key = input.dataset.panelFor || input.name || input.id;
      if (key) {
        const direct = wrap.querySelector('.switch-panel[data-panel-for="' + key + '"]');
        if (direct) return direct;
      }
  
      const services = [...wrap.querySelectorAll('.switch-outer .service')];
      const panels   = [...wrap.querySelectorAll('.switch-panel')];
      const idx = services.indexOf(input);
      return idx > -1 ? panels[idx] || null : null;
    }
  
    function togglePanel(panel, open) {
      if (!panel) return;
      panel.setAttribute('aria-hidden', String(!open));
      panel.classList.toggle('is-open', open);
  
      panel.querySelectorAll('input, select, textarea, button').forEach(el => {
        if (!el.classList.contains('service')) el.disabled = !open;
        if (!open && (el.type === 'checkbox' || el.type === 'radio')) el.checked = false;
      });
  
      if (open) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
        requestAnimationFrame(() => { panel.style.maxHeight = '0px'; });
      }
    }
  
    document.addEventListener('change', function (e) {
      if (!e.target.matches('.service')) return;
      const wrap = e.target.closest('.switch-wrapper');
      const panel = getPanelForService(e.target);
  
      if (e.target.checked) {
        // 🔹 Закрываем все остальные в этом .switch-wrapper
        // wrap.querySelectorAll('.switch-panel.is-open').forEach(p => {
        //   if (p !== panel) togglePanel(p, false);
        // });
      }
  
      togglePanel(panel, e.target.checked);
    });
  
    document.querySelectorAll('.service').forEach(input => {
      const panel = getPanelForService(input);
      if (!panel) return;
      if (input.checked) {
        panel.classList.add('is-open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
        panel.setAttribute('aria-hidden', 'false');
        panel.querySelectorAll('input, select, textarea, button').forEach(el => {
          if (!el.classList.contains('service')) el.disabled = false;
        });
      } else {
        panel.setAttribute('aria-hidden', 'true');
        panel.style.maxHeight = '0px';
      }
    });
  })();


$(function () {
    var basePerM2 = {
        finish: 500,      // С отделкой
        without_finish: 300,   // Без отделки
        rought: 200,         // Черновая
        fine: 400,          // Чистовая

    };

    var $variant = $('#variant');
    var $area    = $('#area');
    var $ppsqm   = $('.calculate-way .value');
    var $totalEl = $('.selected-sum');

    function getArea(){
        return parseFloat(($area.val() || '').replace(',', '.')) || 0;
    }

    function getCurrentM2(){
        var key = $variant.val();
        return basePerM2[key] || 0;
    }

    function recalc(){
        var area = getArea();
        var base = getCurrentM2() * area;

        var addFixed = 0;
        $('.service:checked').each(function(){
            addFixed += parseFloat($(this).data('price')) || 0;
        });

        var addPerM2 = 0;
        $('.subservice:checked').each(function(){
            addPerM2 += (parseFloat($(this).data('price')) || 0) * area;
        });

        $ppsqm.text(getCurrentM2() + ' ₽/м²');
        $totalEl.text((base + addFixed + addPerM2).toLocaleString('ru-RU') + ' руб.');
        updateSelectedParams();
    }

    $variant.on('change', recalc);
    $area.on('input change', recalc);
    $(document).on('change', '.service, .subservice', recalc);


    function updateSelectedParams() {
        var $list = $('#selectedParams');
        $list.empty(); // очищаем список
    
        var area = getArea();
    
        // 1. Базовый вариант отделки
        var variantText = $('#variant option:selected').text();
        if (variantText) {
            $list.append('<li>' + variantText + ' — ' + getCurrentM2() + ' ₽/м²</li>');
        }
    
        // 2. Фикс-услуги (.service)
        $('.service:checked').each(function(){
            var name = $(this).data('name');
            var price = parseFloat($(this).data('price')) || 0;
            if (name) {
                $list.append('<li>' + name + ' — ' + price.toLocaleString('ru-RU') + ' ₽</li>');
            }
        });
    
        // 3. Услуги за м² (.subservice)
        $('.subservice:checked').each(function(){
            var name = $(this).closest('.panel__row').find('.panel-toggle__title').text().trim();
            var pricePerM2 = parseFloat($(this).data('price')) || 0;
            var total = pricePerM2 * area;
            if (name) {
                $list.append('<li>' + name + ' — ' + pricePerM2 + ' ₽/м² (' + total.toLocaleString('ru-RU') + ' ₽)</li>');
            }
        });
    }
    
    

    recalc(); // при загрузке
});
