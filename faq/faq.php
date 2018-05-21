<?php
    require_once 'includes/header.php';
    require_once 'functions/editor.php';
    require_once 'functions/faq_helper/faqs_db_helper.php';
    $db_helper = new FaqsDbHelper();
    $faqs = $db_helper->queryFaqs();
?>
<main class="no_scroll">
    <section id="faq">
        <h2 class="text-center">Faqs</h2>
        <div id="accordion">
            <?php foreach ($faqs as $faq): ?>

                <div class="card">
                    <div class="card-header" id="<?= 'faq_heading_' . $faq['id']; ?>">
                        <h5 class="mb-0">
                            <button class="btn btn-link" id="<?= 'faq_btn_' . $faq['id']; ?>" data-toggle="collapse" data-target="<?= '#faq_collapse_' . $faq['id']; ?>" aria-expanded="true" aria-controls="<?= 'faq_collapse_' . $faq['id']; ?>">
                                <?= $faq['faq_title']; ?>
                            </button>
                        </h5>
                    </div>

                    <div id="<?= 'faq_collapse_' . $faq['id']; ?>" class="collapse" aria-labelledby="<?= 'faq_heading_' . $faq['id']; ?>" data-parent="#accordion">
                        <div class="card-body">
                            <?= $faq['faq_info']; ?>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </section>
</main>
<script src="js/editor.js"></script>