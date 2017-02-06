(function() {
  'use strict';

  $(document).ready(function() {

    var re = '',
      setInput = $('#displayEquation'),
      setHistory = $('#displayHistory'),
      getOperator = $('.btn-get-op'),
      getNum = $('.btn-get-num'),
      getResult = $('.btn-get-res'),
      clearInput = $('.btn-get-clr'),
      stepBack = $('.btn-get-stpBck'),
      displayHistory = $('.btn-get-histBtn'),
      history = '',
      extHistory = [];

    getNum.click(function() {
      var $this = this;
      if (($($this).text() === '00' || $($this).text() === '0') && ((re.length === 0 && re.startsWith('')) || (re.length === 1 && /[-+/*]/.test(re.charAt(re.length - 1))))) {
        return false;
      } else {
        re += $($this).text();
        return setInput.text(re);
      }
    });

    stepBack.click(function() {
      re = re.slice(0, -1);
      return re.length >= 0 ? setInput.text(re) : false;
    });

    getOperator.click(function() {
      var $this = this;
      if (/[-+/*.]/.test(re.charAt(re.length - 1))) {
        setInput.text(re.replace(re.charAt(re.length - 1), $($this).text()));
      } else {
        re += $($this).text();
        setInput.text(re);
      }
    });

    getResult.click(function() {
      var $this = this;
      history = re;
      if (/[-+/*.]/.test(re.charAt(re.length - 1))) {
        return false;
      } else {
        re = re.includes('.') ? eval(re).toFixed(7) : eval(re).toString(10);
        setHistory.text(re);
        extHistory.push(history + '=' + re);
        console.log(extHistory);
        re = '';
        setInput.text(re);
      }
    });

    displayHistory.click(function() {
      var $this = this;
      console.log(extHistory);
      if ($($this).text() === 'Show complete history' && extHistory[0] !== undefined) {
        $($this).text('Hide complete history');
        $.each(extHistory, function(index, val) {
          $('.extHistory').append('<div class="completeHistoryList">' + extHistory[index] + '</div>');
        });
      } else {
        $($this).text('Show complete history');
        $('.completeHistoryList').remove();
      }

    });

    clearInput.click(function() {
      re = '';
      setInput.text(re);
      setHistory.text(re);
    });

  });
})();