(() => {
  if (
    !(function (e) {
      for (
        var t = e + "=", i = document.cookie.split(";"), r = 0;
        r < i.length;
        r++
      ) {
        for (var n = i[r]; " " === n.charAt(0); ) n = n.substring(1);
        if (0 === n.indexOf(t)) return n.substring(t.length, n.length);
      }
      return "";
    })("sitevisitor")
  ) {
    let e = new Object(),
      t = new Date(
        Date().toLocaleString("de-DE", { timeZone: "Europe/Sofia" })
      );
    (e.referer = document.referrer),
      (e.request = location.pathname.substring(1)),
      (e.time =
        t.getFullYear() +
        "-" +
        ("0" + (t.getMonth() + 1)).slice(-2) +
        "-" +
        t.getDate() +
        " " +
        t.getHours() +
        ":" +
        t.getMinutes() +
        ":" +
        ("0" + t.getSeconds()).slice(-2)),
      (function (e, t, i) {
        var r = new Date();
        r.setTime(r.getTime() + 24 * i * 60 * 60 * 1e3);
        var n = "expires=" + r.toUTCString();
        document.cookie = e + "=" + t + ";" + n + ";path=/";
      })("sitevisitor", btoa(JSON.stringify(e)), 365);
  }
  document.addEventListener("DOMContentLoaded", () => {
    "use strict";
    document.querySelectorAll(".preview-test").forEach((e) => {
      e.addEventListener("click", function (e) {
        e.preventDefault(),
          document
            .querySelector(".preview-devices-active")
            .classList.remove("preview-devices-active"),
          this.classList.add("preview-devices-active"),
          (document.querySelector("#preview-frame").className = this.id.replace(
            "-test",
            ""
          ));
      });
    });
  });
})();
