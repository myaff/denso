<?php require('parts/header.php');?>
<div class="page page--home">
  <div class="container">
    <div class="page__imgs-wrapper">
      <div class="page__img page__img--poly-blue"><img src="<?=$root?>build/img/home/poly-blue.png" alt="Denso"></div>
      <div class="page__img page__img--poly-red"><img src="<?=$root?>build/img/home/poly-red.png" alt="Denso"></div>
      <div class="page__img page__img--question-sm"><img src="<?=$root?>build/img/home/question-sm.png" alt="Denso"></div>
      <div class="page__img page__img--question-md"><img src="<?=$root?>build/img/home/question-md.png" alt="Denso"></div>
      <div class="page__img page__img--question-big"><img src="<?=$root?>build/img/home/question-big.png" alt="Denso"></div>
      <div class="page__img page__img--plug"><img src="<?=$root?>build/img/home/plug.png" alt="Denso"></div>
      <div class="page__img page__img--car"><img src="<?=$root?>build/img/home/car.png" alt="Denso"></div>
    </div>
  </div>
  <div class="container">
    <div class="page__heading tp-heading--huge tp-text--center">ВНИМАНИЕ, </br>МОТОР!</div>
    <div class="page__text tp-text--center">
      <div class="tp-body--main">
        <p>
          О принципе работы двигателя внутреннего сгорания нам рассказывали еще в средней школе.</br>
          Но настоящий автолюбитель должен знать про мотор чуть больше школьника.</br>
          Вам предстоит ответить на восемь вопросов, касающихся устройства и эксплуатации работы двигателя.</br>
          <b>Как говорят мотористы: игра стоит свеч!</b>
        </p>
      </div>
      <a href="test.php" class="btn">Пройти тест</a>
    </div>
    <div class="socials--vertical"><?php include($root.'parts/social.php'); ?></div>
  </div>
</div> <!-- /.page -->
<?php require('parts/footer.php'); ?>