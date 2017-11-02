<?php require('../parts/header-mobile.php');?>
<div class="page page--test pt-8 pb-5">
  <div class="container tp-text--center">
    <div class="page__heading tp-heading--huge tp-text--center mt-5">ВНИМАНИЕ, </br>МОТОР!</div>
    <div class="test__wrapper">
      <?php foreach ($test as $key => $item) { ?>
        <div class="test test--<?=$key + 1?>" data-value="<?=$item['value']?>">
          <div class="test__question">
            <div class="test__content">
              <div class="test__num py-6">
                <img src="<?=$root?>build/img/digits/0<?=$key + 1?>.png" alt="" class="test__num-img"/>
              </div>
              <div class="test__text">
                <div class="tp-body--big"><?=$item['text']?></div>
              </div>
              <div class="test__controls">
                <label for="test-<?=$key + 1?>-yes" class="test-ctrl">
                  <input id="test-<?=$key + 1?>-yes" type="radio" name="test-<?=$key + 1?>" value="1" class="test-ctrl__input hidden">
                  <span class="test-ctrl__text tp-body--big">Да</span>
                </label>
                <label for="test-<?=$key + 1?>-no" class="test-ctrl">
                  <input id="test-<?=$key + 1?>-no" type="radio" name="test-<?=$key + 1?>" value="0" class="test-ctrl__input hidden">
                  <span class="test-ctrl__text tp-body--big">Нет</span>
                </label>
              </div>
              <div class="test__img">
                <img src="<?=$root?>build/img/test/<?=$key + 1;?>/static.png"/>
              </div>
            </div>
          </div>
          <div class="test__answer-wrapper modal__wrapper">
            <div id="test-<?=$key + 1?>-answer" class="test__answer modal">
              <button class="btn-close btn--center js-modal text-next mb-4" data-target="#test-<?=$key + 1?>-answer"></button>
              <div class="modal__content">
                <div class="tp-body--wide fw-light"><?=$item['answer']?></div>
                <div class="modal__footer mt-3">
                  <?php if ($item['value'] === 1) { ?>
                    <img src="<?=$root?>build/img/test/plug-y_m.png" alt="Denso" class="plug mr-2">
                  <?php } else { ?>
                    <img src="<?=$root?>build/img/test/plug-n_m.png" alt="Denso" class="plug mr-2">
                  <?php } ?>
                  <button class="btn btn--light test-next js-modal" data-target="#test-<?=$key + 1?>-answer">Далее</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      <?php } ?>
    </div>
  </div>
</div> <!-- /.page -->
<?php require($root.'parts/footer-mobile.php'); ?>