// Small progressive enhancements. The page reads and works without this file.
(function () {
  // Close the phone menu after a link in it is chosen, so it isn't still open on the way back up.
  var menu = document.querySelector('.dl-menu');
  if (menu) {
    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) menu.removeAttribute('open');
    });
  }

  // Request form.
  // data-endpoint on the <form> is the URL of the form service (Formspree, Web3Forms or a Worker) that accepts a
  // POST and answers with JSON. While it's empty nothing is sent: the form shows the success message with a note
  // saying so, which is what the design preview needs.
  var form = document.querySelector('.dl-form');
  if (!form) return;

  var button = form.querySelector('button[type="submit"]');
  var success = form.querySelector('[data-status="success"]');
  var failure = form.querySelector('[data-status="error"]');
  var previewNote = form.querySelector('[data-preview-note]');
  var buttonLabel = button.textContent;

  function show(message) {
    success.hidden = message !== success;
    failure.hidden = message !== failure;
    message.focus();
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var endpoint = form.getAttribute('data-endpoint');

    if (!endpoint) {
      previewNote.hidden = false;
      form.reset();
      show(success);
      return;
    }

    button.disabled = true;
    button.textContent = 'Sending…';
    fetch(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form),
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Request failed with status ' + response.status);
        form.reset();
        show(success);
      })
      .catch(function () {
        show(failure);
      })
      .finally(function () {
        button.disabled = false;
        button.textContent = buttonLabel;
      });
  });
})();
