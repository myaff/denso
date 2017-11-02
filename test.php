<?php require('parts/header.php');?>
<div class="page page--test">
  <div class="container tp-text--center">
    <div class="page__img page__img--rect-blue"><img src="<?=$root?>build/img/test/rect-blue.png" alt="Denso"></div>
    <div class="page__img page__img--rect-red"><img src="<?=$root?>build/img/test/rect-red.png" alt="Denso"></div>
    <div class="page__heading tp-heading--huge tp-text--center">ВНИМАНИЕ, </br>МОТОР!</div>
    <div class="test__wrapper">
      <?php foreach ($test as $key => $item) { ?>
        <div class="test test--<?=$key + 1?>" data-value="<?=$item['value']?>">
          <div class="test__question">
            <div class="test__num">
              <img src="<?=$root?>build/img/digits/0<?=$key + 1?>.png" alt="" class="test__num-img"/>
            </div>
            <div class="test__content">
              <div class="test__text l-block--center">
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
              <div class="grid-center">
                <div class="col-6">
                  <div class="test__img">
                    <img src="<?=$root?>build/img/test/<?=$key + 1;?>/static.png"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="test__animation-wrapper modal__wrapper modal__wrapper--trans invisible">
            <div id="test-<?=$key + 1?>-animation" class="modal test__animation invisible">
              <div class="bg"><img src="<?=$root?>build/img/test/rect.png" alt=""></div>
              <?php foreach ($item['images'] as $img) { ?>
                <div class="<?=$img?>"><img src="<?=$root?>build/img/test/<?=$key + 1?>/<?=$img?>.png" alt=""/></div>
              <?php } ?>
            </div>
          </div>
          <div class="test__answer-wrapper modal__wrapper">
            <div id="test-<?=$key + 1?>-answer" class="test__answer modal">
              <button class="btn-close js-modal text-next" data-target="#test-<?=$key + 1?>-answer"></button>
              <div class="modal__content">
                <div class="tp-body--wide fw-light"><?=$item['answer']?></div>
                <button class="btn btn--light test-next js-modal" data-target="#test-<?=$key + 1?>-answer">Далее</button>
              </div>
            </div>
          </div>
        </div>
      <?php } ?>
    </div>
    <div class="socials--vertical"><?php include($root.'parts/social.php'); ?></div>
  </div>
</div> <!-- /.page -->
<?php require('parts/footer.php'); ?>