// Preview-only layer. Added by `npm run build:preview`; the launch build leaves it out.
//
// These measures make casual copying and sharing awkward and mark the page as a preview.
// They can't stop someone who uses browser developer tools, saves the page or takes screenshots.
// Real access control comes from Cloudflare Access; real ownership protection comes from your agreement.

(function () {
  // Change this to your studio's name.
  var STUDIO = 'Squarehead Creative';
  var YEAR = new Date().getFullYear();

  var root = document.documentElement;
  root.classList.add('is-preview');

  function inField(target) {
    return !!(target && target.closest && target.closest('input, textarea, select, [contenteditable="true"]'));
  }

  ['contextmenu', 'copy', 'cut', 'dragstart', 'selectstart'].forEach(function (type) {
    document.addEventListener(type, function (event) {
      if (!inField(event.target)) event.preventDefault();
    });
  });

  // Save, view source and print. Some browsers don't allow pages to cancel these; this is best effort.
  document.addEventListener('keydown', function (event) {
    if (!(event.metaKey || event.ctrlKey)) return;
    var key = (event.key || '').toLowerCase();
    if (key === 's' || key === 'u' || key === 'p') event.preventDefault();
  });

  function addLayer() {
    var ribbon = document.createElement('div');
    ribbon.className = 'preview-ribbon';
    ribbon.setAttribute('role', 'note');

    var shortText = document.createElement('span');
    shortText.className = 'preview-short';
    shortText.textContent = 'Design preview. Not for distribution.';

    var longText = document.createElement('span');
    longText.className = 'preview-long';
    longText.textContent = 'Design preview for Premier Notary Services. Not for distribution. © ' + YEAR + ' ' + STUDIO + '.';

    ribbon.appendChild(shortText);
    ribbon.appendChild(longText);
    document.body.insertBefore(ribbon, document.body.firstChild);

    var mark = document.createElement('div');
    mark.className = 'preview-watermark';
    mark.setAttribute('aria-hidden', 'true');
    document.body.appendChild(mark);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addLayer);
  } else {
    addLayer();
  }
})();
