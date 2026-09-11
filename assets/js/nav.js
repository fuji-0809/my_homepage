(function () {
  if (window.location.protocol === 'file:' && document.currentScript) {
    var siteRoot = new URL('../../', document.currentScript.src);

    document.querySelectorAll('a[href^="/"]').forEach(function (link) {
      var path = link.getAttribute('href').slice(1);
      if (!path) {
        path = 'index.html';
      } else if (path.endsWith('/')) {
        path += 'index.html';
      }
      link.href = new URL(path, siteRoot).href;
    });
  }

  var dropdowns = Array.prototype.slice.call(
    document.querySelectorAll('.site nav details.nav-dropdown')
  );

  if (!dropdowns.length) {
    return;
  }

  dropdowns.forEach(function (dropdown) {
    dropdown.addEventListener('toggle', function () {
      if (!dropdown.open) {
        return;
      }

      dropdowns.forEach(function (other) {
        if (other !== dropdown) {
          other.open = false;
        }
      });
    });
  });

  document.addEventListener('click', function (event) {
    if (!event.target.closest('.site nav')) {
      dropdowns.forEach(function (dropdown) {
        dropdown.open = false;
      });
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      dropdowns.forEach(function (dropdown) {
        dropdown.open = false;
      });
    }
  });
})();
