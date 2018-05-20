<?php
require_once  '../includes/header.php';
require_once '../functions/faq_helper/faqs_db_helper.php';
require_once '../functions/editor.php';

$db_helper = new FaqsDbHelper();
$faqs = $db_helper->queryFaqs();

$e = new editor();
?>
<style>
    .btn-link {
        color: black;
        font-weight: bold;
    }
</style>
<main>

    <section id="faqs_admin">
        <div class="container">

            <div>
                <h2 class="text-center">Faqs Management</h2>

                <button id="create" class="btn btn-outline-dark text-center" onclick="create()">Create New Faq</button>

            </div>
            <br>
            <div id="edit_div_id">
                <table class="table table-hover ">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Faq Content</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($faqs as $faq): ?>
                    <tr>
                        <th scope="col"><?= $faq['id']; ?></th>
                        <td>
                            <p id="<?= "msg_" . $faq['id']; ?>" class="text-danger"></p>
                            <h3 id="<?= 'title_' . $faq['id']; ?>"><?= $faq['faq_title']; ?></h3>
                            <p id="<?= 'info_' . $faq['id']; ?>"><?= $faq['faq_info']; ?></p>
                            <div id="<?= 'editor_div_' . $faq['id']?>"></div>
                            <div>
                                <button id="<?= 'edit_' . $faq['id']; ?>" class="btn btn-link" onclick="edit(this.id)">Edit</button>
                                <button id="<?= 'delete_' . $faq['id']; ?>" class="btn btn-link" onclick="del(this.id)">Delete</button>
                                <button id="<?= 'cancel_' . $faq['id']; ?>" class="btn btn-link invisible" onclick="edit_cancel(this.id)">Cancel</button>
                                <button id="<?= 'submit_' . $faq['id']; ?>" class="btn btn-link invisible" onclick="edit_submit(this.id)">Submit</button>
                            </div>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            </div>

            <div id="new_div_id" class="invisible">
                <div>
                    <h3><strong>Create a New Faq</strong></h3>
                </div>
                <p id="create_error_msg" class="text-danger"></p>
                <table class="table">
                    <tbody>
                    <td>
                        <h3 id="title_new" contenteditable="true" style="border:1px solid silver;border-radius:5px;box-shadow: inset 0 0 10px silver"></h3>
                        <div><?php $e->displayEditor(); ?></div>
                        <div>
                            <button id="cancel_new" class="btn btn-link" onclick="create_cancel()">Cancel</button>
                            <button id="submit_new" class="btn btn-link" onclick="create_submit()">Submit</button>
                        </div>
                    </td>
                    </tbody>
                </table>
            </div>
        </div>
    </section id="faqs_admin">
</main>
<script src="../js/faq_admin.js"></script>
<?php require_once '../includes/footer.php';?>
