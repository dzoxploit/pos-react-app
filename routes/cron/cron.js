const express = require("express");
const router = express.Router();
const helper = require("../../cronjob/scheduler");

/* GET home page. */
router.get("/", async (req, res) => {
  res.render("index", { title: "Post react app cron job" });
});

router.post("/scheduler/reseller", async (req, res) => {
  // grab email address that customer entered and the interval selected
  var now = new Date();
var now = new Date(milliseconds);
var now = new Date(dateString);
var now = new Date(jsonDate);
var now = new Date(year, month, day);
var now = new Date(year, month, day, hour, minute, second, millisecond);
const { reseller_email, interval, reseller_expired } = req.body;

  //stopping previous schedules if exist
  await helper.stopMonitoringReseller(reseller_email);

  // adds new schedule to database ....
  await helper.addNewSchedulerReseller(reseller_email, interval);

  // if selected interval is not to unsubscrive then start monitoring for new schedule
  if (interval != "unsubscribe" && reseller_expired != now) await helper.startMonitoring(reseller_email, interval, reseller_expired);

  res.render("success", {
    layout: false,
    data: { reseller_email: reseller_email, interval: interval, reseller_expired: reseller_expired }
  });
});
router.post("/scheduler/user", async (req, res) => {
  // grab email address that customer entered and the interval selected
  const { email, interval} = req.body;

  //stopping previous schedules if exist
  await helper.stopMonitoringReseller(email);

  // adds new schedule to database ....
  await helper.addNewSchedulerReseller(reseller_email, interval);

  // if selected interval is not to unsubscrive then start monitoring for new schedule
  if (interval != "unsubscribe" && reseller_expired != now) await helper.startMonitoring(reseller_email, interval, reseller_expired);

  res.render("success", {
    layout: false,
    data: { reseller_email: reseller_email, interval: interval, reseller_expired: reseller_expired }
  });
});
router.post("scheduler/stock-barang/menipis", async (req,res) => {
  const { email_admin, status_admin, jumlah_barang_siap_jual} = req.body;

  await helper.stopMonitoringStockBarang(email_admin);

  await helper.addNewSchedulerStockBarang(email_admin, status_admin);

  if( status_admin == 1 && jumlah_barang_siap_jual == "0") await helper.startMonitoring(email_admin, status_admin, jumlah_barang_siap_jual);
  res.render("success", {
    layout: false,
    data: { email_admin: email_admin, status_admin: status_admin, jumlah_barang_siap_jual: jumlah_barang_siap_jual }
  });
});
router.post("scheduler/stock-barang/kosong", async (req,res) => {
  const { email_admin, status_admin, jumlah_barang_siap_jual} = req.body;

  await helper.stopMonitoringStockBarang(email_admin);

  await helper.addNewSchedulerStockBarang(email_admin, status_admin, jumlah_barang_siap_jual);

  if( status_admin == 1 && jumlah_barang_siap_jual == "0") await helper.startMonitoring(email_admin, status_admin, jumlah_barang_siap_jual);
  res.render("success", {
    layout: false,
    data: { email_admin: email_admin, status_admin: status_admin, jumlah_barang_siap_jual: jumlah_barang_siap_jual }
  });
});
router.post("scheduler/bahan-baku/stock-menipis", async (req,res) => {
  const { email_admin, status_admin, jumlah_bahan_baku} = req.body;

  await helper.stopMonitoringStockBarang(email_admin);

  await helper.addNewSchedulerStockBarang(email_admin, status_admin, jumlah_bahan_baku);

  if( status_admin == 1 && jumlah_bahan_baku <=  10) await helper.startMonitoring(email_admin, status_admin, jumlah_bahan_baku);
  res.render("success", {
    layout: false,
    data: { email_admin: email_admin, status_admin: status_admin, jumlah_barang_siap_jual: jumlah_barang_siap_jual }
  });
});
router.post("scheduler/bahan-baku/kosong", async (req,res) => {
  const { email_admin, status_admin, jumlah_bahan_baku} = req.body;

  await helper.stopMonitoringStockBarang(email_admin);

  await helper.addNewSchedulerStockBarang(email_admin, status_admin, jumlah_bahan_baku);

  if( status_admin == 1 && jumlah_bahan_baku ==  0) await helper.startMonitoring(email_admin, status_admin, jumlah_bahan_baku);
  res.render("success", {
    layout: false,
    data: { email_admin: email_admin, status_admin: status_admin, jumlah_barang_siap_jual: jumlah_barang_siap_jual }
  });
});

router.post("scheduler/whatsapp/barang/stock-menipis", async (req,res) => {
    const {phone_number, status_admin, jumlah_barang_siap_jual} = req.body;
    await helper.stopMonitoringBarangWhatsapp(phone_number);
    
    await helper.addNewSchedulerBarangWhatsapp(phone_number, status_admin, jumlah_barang_siap_jual);

    if( status_admin == 1 && jumlah_bahan_baku ==  0) await helper.startMonitoringBarangWhatsapp(phone_number, status_admin, jumlah_barang_siap_jual);
    res.render("success", {
      layout: false,
      data: { phone_number: phone_number, status_admin: status_admin, jumlah_barang_siap_jual: jumlah_barang_siap_jual }
    });
});



module.exports = router;
