<div class="modal__wrapper modal__wrapper--trans invisible">
  <div id="test-correct" class="modal modal--correct invisible">
    <img class="romb" src="<?=$root?>build/img/romb-blue.png" />
    <img class="finger" src="<?=$root?>build/img/finger-up.png" />
  </div>
  <div id="test-incorrect" class="modal modal--incorrect invisible">
    <img class="romb" src="<?=$root?>build/img/romb-red.png" />
    <img class="finger" src="<?=$root?>build/img/finger-down.png" />
  </div>
</div>
<div class="modal__wrapper modal__wrapper--dark invisible">
  <div id="test-result" class="modal modal--result invisible">
    <!-- <button class="btn-close js-modal" data-target="#test-result"></button> -->
    <div class="modal__header header">
      <div class="header__content">
        <div class="header__logo logo logo--denso">
          <a href="#" class="logo__link" target="_blank">
            <img src="<?=$root?>build/img/logo-denso.jpg" alt="denso" />
          </a>
        </div>
        <div class="header__logo logo logo--zr">
          <a href="#" class="logo__link" target="_blank">
            <img src="<?=$root?>build/img/logo-zr.png" alt="За рулём" />
          </a>
        </div>
      </div>
    </div>
    <div class="modal__content">
      <div class="modal__result result tp-text--center">
        <div class="result__note tp-body--wide tp--uc">Результат:</div>
        <div class="result--high">
          <div class="result__title tp-heading--huge">Прекрасный результат!</div>
          <div class="result__text">
            <div class="tp-body--wide fw-thin">Можете идти преподавать автодело. </br>Но все же стоит помнить о том, что всегда необходимо заботиться о здоровье своего автомобиля. Одно из условий безотказной работы двигателя – установка качественных свечей зажигания. </br><b>Подобрать подходящие для вашего авто свечи очень просто!</b></div>
          </div>
        </div>
        <div class="result--medium">
          <div class="result__title tp-heading--huge">Пара ошибок — не страшно!</div>
          <div class="result__text">
            <div class="tp-body--wide fw-thin">В целом, вы справились и это главное. Но следует помнить, что одно из условий безотказной работы двигателя – установка качественных свечей зажигания. <b>Подобрать подходящие для вашего авто свечи очень просто!</b></div>
          </div>
        </div>
        <div class="result--low">
          <div class="result__title tp-heading--huge">Ой-ой!</div>
          <div class="result__text">
            <div class="tp-body--wide fw-thin">Похоже, автомобиль для вас лишь средство передвижения. Но это не должно мешать заботиться о его здоровье. Одно из условий безотказной работы двигателя – установка качественных свечей зажигания. <b>Подобрать подходящие для вашего авто свечи очень просто!</b></div>
          </div>
        </div>
        <button class="btn btn--alt btn--center">выбрать</button>
      </div>
      <div class="modal__socials">
        <?php include($root.'parts/social.php'); ?>
      </div>
    </div>
  </div>
</div>