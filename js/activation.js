$(window).load(async function() {
                let record = await getDatabase();
                let trial = getCookie("trial");

                if (!record.pages[page_id]) {
                    return;
                }

                let user = getUser(record.database, getCookie("id"));



                console.log("user2: " + user.activation_expired);

                if (user.activated && new Date(user.activation_expired).getTime() < new Date().getTime()) {
                    databaseSetActivated(false, 62125920000);
                    $("#userNotActivatedDialogModal").modal("show");
                    document.getElementById('trialTitle').innerHTML = "Akun kamu sudah kadaluarsa, kamu dapat mengaktivasi kembali akun kamu.";
                    $('#userNotActivatedDialogModal').on('hidden.bs.modal', function () {
                      document.location.replace("index.html");
                    });
                }

                if (!user.activated && trial) {
                    $("#userNotActivatedDialogModal").modal("show");
                    document.getElementById('trialTitle').innerHTML = "Kamu masih dapat mengakses halaman ini karena kamu masih memiliki " + trial + " trial gratis. Kamu tidak dapat mengakses halaman ini jika kamu tidak memiliki trial gratis, dan kamu harus mengaktivasi akun kamu untuk mengakses halaman ini.";
                    setCookie("trial", trial-1);
                } else if (!user.activated) {
                    $("#userNotActivatedDialogModal").modal("show");
                    $('#userNotActivatedDialogModal').on('hidden.bs.modal', function () {
                      document.location.replace("index.html");
                    });
                }
            });
