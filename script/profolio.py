import time
import random
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait # available since 2.4.0
from selenium.webdriver.support import expected_conditions as EC # available since 2.26.0

link_chat = "http://ladydunn10.azurewebsites.net/"

#live links

link_me = "http://andybao.net/portfolio/home/index.html"
link_faq_client = "http://andybao.net/portfolio/faq/faq.php"
link_faq_admin = "http://andybao.net/portfolio/faq/admin/faq_admin.php"
link_game = "http://andybao.net/portfolio/game/game.html"
link_game_video = "http://andybao.net/portfolio/game/video/video.html"
link_about_me = "http://andybao.net/portfolio/aboutme/aboutme.html"

timer = 30

#local links
'''
link_me = "http://localhost:4003/"
link_faq_client = "http://localhost:8000/portfolio/faq/faq.php"
link_faq_admin = "http://localhost:8000/portfolio/faq/admin/faq_admin.php"
link_game_video = "http://localhost:8000/portfolio/game/video/video.html"
link_game = "http://localhost:8000/portfolio/game/game.html"
'''

# me
driver_me = webdriver.Firefox()
# Resize the window to the screen width/height
driver_me.set_window_size(500, 877)

# Move the window to position x/y
driver_me.set_window_position(941, 22)

driver_me.get(link_me)


#wait drvier_me active f_c_btn button
f_c_btn = WebDriverWait(driver_me, 300).until(EC.element_to_be_clickable((By.ID, "f_c_btn")))

# faq client
driver_f_c = webdriver.Firefox()
driver_f_c.set_window_size(420, 877)
driver_f_c.set_window_position(0, 22)
driver_f_c.get(link_faq_client)

time.sleep(1)

#faq client wait
faq_btn_1 = WebDriverWait(driver_f_c, timer).until(EC.presence_of_element_located((By.ID, "faq_btn_1")))
faq_btn_2 = WebDriverWait(driver_f_c, timer).until(EC.presence_of_element_located((By.ID, "faq_btn_2")))


faq_btn_1.click()
time.sleep(1)
faq_btn_2.click()
time.sleep(1)
f_c_btn.click()

#wait drvier_me active f_a_create_btn button
f_a_create_btn = WebDriverWait(driver_me, timer).until(EC.element_to_be_clickable((By.ID, "f_a_create_btn")))

# faq admin
driver_f_a = webdriver.Firefox()
driver_f_a.set_window_size(520, 877)
driver_f_a.set_window_position(420, 22)
driver_f_a.get(link_faq_admin);

time.sleep(3)

#faq admin wait
faq_create = WebDriverWait(driver_f_a, timer).until(EC.presence_of_element_located((By.ID, "create")))

faq_create.click()

new_title = WebDriverWait(driver_f_a, timer).until(EC.presence_of_element_located((By.ID, "title_new")))
new_editor = WebDriverWait(driver_f_a, timer).until(EC.presence_of_element_located((By.ID, "editor")))
new_submit = WebDriverWait(driver_f_a, timer).until(EC.presence_of_element_located((By.ID, "submit_new")))

new_title.send_keys("What is andybao's website")
new_editor.send_keys("andybao.net")

time.sleep(1)

new_submit.click()

time.sleep(1)

new_info = driver_f_a.find_element_by_xpath("//*[text()='andybao.net']")
#new_id = new_info[0].get_attribute("id")
new_id = new_info.get_attribute("id")
new_index = new_id.split("_")[1]
new_button_id = 'faq_btn_' + new_index
new_edit_id = 'edit_' + new_index
new_delete_id = 'delete_' + new_index
new_submit_id = 'submit_' + new_index
new_title_id = 'title_' + new_index

#faq client refresh
driver_f_c.refresh()

#faq client wait
faq_btn_new = WebDriverWait(driver_f_c, timer).until(EC.presence_of_element_located((By.ID, new_button_id)))
faq_btn_new.click()

time.sleep(1)
f_a_create_btn.click()

#wait drvier_me active f_a_edit_btn button
f_a_edit_btn = WebDriverWait(driver_me, timer).until(EC.element_to_be_clickable((By.ID, "f_a_edit_btn")))

new_edit = driver_f_a.find_element_by_id(new_edit_id)
driver_f_a.execute_script("return arguments[0].scrollIntoView(true);", new_info)
new_edit.click()
time.sleep(1)

edit_title = WebDriverWait(driver_f_a, timer).until(EC.presence_of_element_located((By.ID, new_title_id)))
edit_submit = WebDriverWait(driver_f_a, timer).until(EC.presence_of_element_located((By.ID, new_submit_id)))
edit_editor = WebDriverWait(driver_f_a, timer).until(EC.presence_of_element_located((By.ID, 'editor')))
edit_title.clear()
edit_editor.clear()
edit_title.send_keys("What is andybao's number")
edit_editor.send_keys("647-870-0127")

time.sleep(1)

edit_submit.click()

#faq client refresh
driver_f_c.refresh()

time.sleep(1)

#faq client wait
faq_btn_new = WebDriverWait(driver_f_c, timer).until(EC.presence_of_element_located((By.ID, new_button_id)))
faq_btn_new.click()

time.sleep(1)
f_a_edit_btn.click()


#wait drvier_me active f_a_edit_btn button
f_a_delete_btn = WebDriverWait(driver_me, timer).until(EC.element_to_be_clickable((By.ID, "f_a_delete_btn")))
delete = WebDriverWait(driver_f_a, timer).until(EC.presence_of_element_located((By.ID, new_delete_id)))
delete.click()
time.sleep(1)
driver_f_a.switch_to.alert.accept()
time.sleep(1)
driver_f_c.refresh()
time.sleep(1)

#close f_a and f_c
driver_f_a.close()
driver_f_c.close()

f_a_delete_btn.click()

time.sleep(1)

#------------ Chat ----------------#

#wait driver_me active h_c_btn
h_c_btn = WebDriverWait(driver_me, timer).until(EC.element_to_be_clickable((By.ID, "h_c_btn")))

# chat client
driver_h_c = webdriver.Firefox()
driver_h_c.set_window_size(470, 877)
driver_h_c.set_window_position(0, 22)
driver_h_c.get(link_chat)

h_c_login_submit = WebDriverWait(driver_h_c, timer).until(EC.presence_of_element_located((By.ID, "login_submit")))

time.sleep(1)

h_c_email_input = driver_h_c.find_element_by_id("inputEmail")
h_c_email_input.send_keys("kd@gmail.com")
h_c_pw_input = driver_h_c.find_element_by_id("inputPassword")
h_c_pw_input.send_keys("12345")

time.sleep(1)

h_c_login_submit.click()
chat_with_admin_btn = WebDriverWait(driver_h_c, timer).until(EC.presence_of_element_located((By.XPATH, "//*[text()='Chat with Admin']")))

#chat admin
driver_h_a = webdriver.Firefox()
driver_h_a.set_window_size(468, 877)
driver_h_a.set_window_position(470, 22)
driver_h_a.get(link_chat)

h_a_login_submit = WebDriverWait(driver_h_a, timer).until(EC.presence_of_element_located((By.ID, "login_submit")))

time.sleep(1)

h_a_email_input = driver_h_a.find_element_by_id("inputEmail")
h_a_email_input.send_keys("admin@gmail.com")
h_a_pw_input = driver_h_a.find_element_by_id("inputPassword")
h_a_pw_input.send_keys("12345")

time.sleep(1)

h_a_login_submit.click()
chat_with_user_btn = WebDriverWait(driver_h_a, timer).until(EC.presence_of_element_located((By.XPATH, "//*[text()='Chat with User']")))

time.sleep(1)

chat_with_admin_btn.click()
h_c_msg = WebDriverWait(driver_h_c, timer).until(EC.presence_of_element_located((By.ID, "message")))
h_c_send_btn = driver_h_c.find_element_by_id("sendmessage")

time.sleep(1)

chat_with_user_btn.click()
h_a_msg = WebDriverWait(driver_h_a, timer).until(EC.presence_of_element_located((By.ID, "message")))
h_a_send_btn = driver_h_a.find_element_by_id("sendmessage")

time.sleep(5)

h_c_msg.send_keys("hey there ")

time.sleep(1)

h_c_send_btn.click()

#WebDriverWait(driver_h_a, timer).until(EC.presence_of_element_located((By.XPATH, "//*[text()='Kevin: hey there']")))
WebDriverWait(driver_h_a, timer).until(EC.presence_of_element_located((By.XPATH, "//li[contains(text(),'hey there')]")))

time.sleep(1)

h_a_msg.send_keys("hey kevin ")

time.sleep(1)

h_a_send_btn.click()

WebDriverWait(driver_h_c, timer).until(EC.presence_of_element_located((By.XPATH, "//li[contains(text(),'hey kevin')]")))

time.sleep(1)

h_c_msg.send_keys("what is andy's website? ")

time.sleep(1)

h_c_send_btn.click()

WebDriverWait(driver_h_a, timer).until(EC.presence_of_element_located((By.XPATH, "//li[contains(text(),'website')]")))

time.sleep(1)

h_a_msg.send_keys("andybao.net ")

time.sleep(1)

h_a_send_btn.click()

WebDriverWait(driver_h_c, timer).until(EC.presence_of_element_located((By.XPATH, "//li[contains(text(),'andybao.net')]")))
h_c_btn.click()

#wait driver_me active h_a_btn
h_a_btn = WebDriverWait(driver_me, timer).until(EC.element_to_be_clickable((By.ID, "h_a_btn")))
driver_h_c.close()
time.sleep(1)
driver_h_a.set_window_position(0, 22)
driver_h_a.set_window_size(935, 877)
time.sleep(1)

h_a_save_btn = driver_h_a.find_element_by_id("submit")
h_a_save_btn.click()

h_a_back = WebDriverWait(driver_h_a, timer).until(EC.presence_of_element_located((By.XPATH, "//*[text()='Back to Admin Home']")))
time.sleep(1)
#h_a_back = driver_h_a.find_element_by_xpath("//*[text()='Back to Admin Home']")
h_a_back.click()

h_a_management = WebDriverWait(driver_h_a, timer).until(EC.presence_of_element_located((By.XPATH, "//*[text()='Chats Management']")))
h_a_management.click()

WebDriverWait(driver_h_a, timer).until(EC.presence_of_element_located((By.XPATH, "//*[text()='Delete']")))
h_a_delete_list = driver_h_a.find_elements_by_xpath("//*[text()='Delete']")
time.sleep(3)
h_a_delete_list[1].click()


WebDriverWait(driver_h_a, timer).until(EC.presence_of_element_located((By.XPATH, "//*[text()='Back to List']")))
#h_a_delete_btn = driver_h_a.find_elements_by_xpath("//*[text()='Delete']")
h_a_delete_btn = driver_h_a.find_element_by_class_name("btn")
h_a_delete_btn.click()

time.sleep(5)

driver_h_a.close()

h_a_btn.click()

#wait driver_me active g_v_btn
g_v_btn = WebDriverWait(driver_me, timer).until(EC.element_to_be_clickable((By.ID, "g_v_btn")))

# game video
driver_g_v = webdriver.Firefox()
driver_g_v.set_window_size(940, 877)
driver_g_v.set_window_position(0, 22)
driver_g_v.get(link_game_video)

time.sleep(25)

end_flag = driver_g_v.execute_script("return document.getElementById('video').ended")

while end_flag == False:
    time.sleep(1)
    end_flag = driver_g_v.execute_script("return document.getElementById('video').ended")

time.sleep(1)

driver_g_v.close()

g_v_btn.click()

#wait driver_me active g_p_btn
g_p_btn = WebDriverWait(driver_me, timer).until(EC.element_to_be_clickable((By.ID, "g_p_btn")))

# game video
driver_g_p = webdriver.Firefox()
driver_g_p.set_window_size(940, 877)
driver_g_p.set_window_position(0, 22)
driver_g_p.get(link_game)

time.sleep(3)

game_start_btn = WebDriverWait(driver_g_p, timer).until(EC.presence_of_element_located((By.ID, "start_btn")))
game_start_btn.click()

score = driver_g_p.find_element_by_id("scorelabel")
actions = ActionChains(driver_g_p)

again_btn = driver_g_p.find_element_by_id("again_btn")

while again_btn.is_displayed() == False:
    time.sleep(0.5)
    x = random.randint(-120, 200)
    y = random.randint(365, 515)
    actions.move_to_element_with_offset(score, x, y)
    try:
        actions.perform()
    except:
        time.sleep(1)

final_point_string = WebDriverWait(driver_g_p, timer).until(EC.presence_of_element_located((By.ID, "finalscore")))
final_point = final_point_string.text.split(" ")[0]

time.sleep(3)

driver_g_p.close()

g_p_btn.click()

#wait driver_me active about_btn
about_btn = WebDriverWait(driver_me, timer).until(EC.element_to_be_clickable((By.ID, "about_btn")))

# aboutme
driver_about = webdriver.Firefox()
driver_about.set_window_size(940, 877)
driver_about.set_window_position(0, 22)
driver_about.get(link_about_me)

about_btn.click()

#wait driver_me active final_btn
final_btn = WebDriverWait(driver_me, timer).until(EC.element_to_be_clickable((By.ID, "final_btn")))
time.sleep(20)
driver_about.close()
driver_me.close()
