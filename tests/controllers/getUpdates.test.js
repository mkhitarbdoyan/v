var assert = require("assert");
var operations = require("../../controllers/app.controller.js");


const getUpdates = require("../../controllers/app.controller.js");

const arr1 = [
  {
    CIDIPR: '480',
    ITEMPR: '57215',
    PHQTPR: '24.000',
    BARCOD: '3409802',
    LARTAR: 'ICE BREAKERS APPLE WAT TANG 42G',
    SELPPR: '1350.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '66489',
    PHQTPR: '.000',
    BARCOD: '30168138',
    LARTAR: 'MAYBELLINE MSCR SNP 02 BLCK CHRRY',
    SELPPR: '3400.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '66490',
    PHQTPR: '.000',
    BARCOD: '30168152',
    LARTAR: 'MAYBELLINE MSCR SNP 04 DARK BLUE',
    SELPPR: '4500.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '60048',
    PHQTPR: '1.000',
    BARCOD: '30168527',
    LARTAR: 'MAYBELLINE LIPSTICK SUPERST MATT 15',
    SELPPR: '4050.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '60049',
    PHQTPR: '2.000',
    BARCOD: '30168534',
    LARTAR: 'MAYBELLINE LIPSTICK SUPERST MATT 20',
    SELPPR: '4450.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '60055',
    PHQTPR: '2.000',
    BARCOD: '30168541',
    LARTAR: 'MAYBELLINE LIPSTICK SUPERST MATT 50',
    SELPPR: '4600.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '66491',
    PHQTPR: '.000',
    BARCOD: '30170643',
    LARTAR: 'MAYBELLINE MSCR SNP 01 BLACK',
    SELPPR: '3680.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '16922',
    PHQTPR: '13.000',
    BARCOD: '40055763',
    LARTAR: 'BUBCHEN SOFT CREAM 20 ML',
    SELPPR: '660.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '7836',
    PHQTPR: '4.000',
    BARCOD: '40122083',
    LARTAR: 'KUHNE APPLE VINEGAR 750ML',
    SELPPR: '1350.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '59832',
    PHQTPR: '1.000',
    BARCOD: '40122113',
    LARTAR: 'KUHNE MUSTARD EXTRA HOT 250ML',
    SELPPR: '1150.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '7838',
    PHQTPR: '.000',
    BARCOD: '40122342',
    LARTAR: 'KUHNE MUSTARD MEDIUM HOT 250ML',
    SELPPR: '1150.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '7841',
    PHQTPR: '4.000',
    BARCOD: '40122526',
    LARTAR: 'KUHNE MUSTARD WHOLEGRAIN 250ML',
    SELPPR: '1150.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '50284',
    PHQTPR: '.000',
    BARCOD: '40144979',
    LARTAR: 'MAMBA CHWNG CANDY TROPIC 106G',
    SELPPR: '520.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '17014',
    PHQTPR: '1.000',
    BARCOD: '40145228',
    LARTAR: 'ZOTT MONTE ZOTT YOGURT 55G',
    SELPPR: '270.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '7666',
    PHQTPR: '5.000',
    BARCOD: '40152240',
    LARTAR: 'TAFT WAX SHINE 75ML',
    SELPPR: '1930.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '65182',
    PHQTPR: '2.000',
    BARCOD: '40198637',
    LARTAR: 'KUHNE HOT CHILI MEAT SAUCE 235ML',
    SELPPR: '1450.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '65180',
    PHQTPR: '12.000',
    BARCOD: '40198644',
    LARTAR: 'KUHNE GARLIC MEAT SAUCE 235ML',
    SELPPR: '1450.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '65183',
    PHQTPR: '.000',
    BARCOD: '40198651',
    LARTAR: 'KUHNE PEPPER BBQ MEAT SAUCE 235ML',
    SELPPR: '1450.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '65181',
    PHQTPR: '8.000',
    BARCOD: '40198668',
    LARTAR: 'KUHNE BURGER STYLE MEAT SAUCE 235ML',
    SELPPR: '1450.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '64315',
    PHQTPR: '1.000',
    BARCOD: '40278063',
    LARTAR: 'WILKINSON RAZOR DUPLO X5',
    SELPPR: '720.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '16306',
    PHQTPR: '27.000',
    BARCOD: '40306544',
    LARTAR: 'DAVIDOFF CLASSIC SLIMS',
    SELPPR: '750.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '16307',
    PHQTPR: '3.000',
    BARCOD: '40306551',
    LARTAR: 'DAVIDOFF GOLD SLIMS',
    SELPPR: '750.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '16136',
    PHQTPR: '.000',
    BARCOD: '40329055',
    LARTAR: 'CAMEL KS FILTERS',
    SELPPR: '700.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '16122',
    PHQTPR: '53.000',
    BARCOD: '40329253',
    LARTAR: 'WINSTON KS CLASSIC',
    SELPPR: '600.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '16123',
    PHQTPR: '62.000',
    BARCOD: '40329574',
    LARTAR: 'WINSTON KS BLUE',
    SELPPR: '600.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '16124',
    PHQTPR: '9.000',
    BARCOD: '40329598',
    LARTAR: 'WINSTON KS SILVER',
    SELPPR: '600.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '16125',
    PHQTPR: '56.000',
    BARCOD: '40331928',
    LARTAR: 'WINSTON KS WHITE',
    SELPPR: '600.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '52765',
    PHQTPR: '.000',
    BARCOD: '40338545',
    LARTAR: 'ZOTT MONTE SNACK 29G',
    SELPPR: '320.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '17010',
    PHQTPR: '.000',
    BARCOD: '40338576',
    LARTAR: 'ZOTTIS YOGURT FRUIT 0.0% 115G',
    SELPPR: '230.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '17012',
    PHQTPR: '1.000',
    BARCOD: '40338637',
    LARTAR: 'ZOTTIS DESERT CHOCOLATE 3.8%115G',
    SELPPR: '230.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '67365',
    PHQTPR: '5.000',
    BARCOD: '40623092',
    LARTAR: 'HIPP WASHING FOAM 250ML',
    SELPPR: '2780.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '67371',
    PHQTPR: '.000',
    BARCOD: '40623900',
    LARTAR: 'HIPP SOS NAPPY RASH CREAM 20ML',
    SELPPR: '1120.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '59837',
    PHQTPR: '1.000',
    BARCOD: '40804835',
    LARTAR: 'KUHNE SAUCE HOT CHILI 250ML',
    SELPPR: '1150.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '59834',
    PHQTPR: '7.000',
    BARCOD: '40804873',
    LARTAR: 'KUHNE DRESSING YOGHURT 250ML',
    SELPPR: '990.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '48423',
    PHQTPR: '9.000',
    BARCOD: '40804880',
    LARTAR: 'KUHNE DRESSING 1000ISLANDS 250ML',
    SELPPR: '990.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '59836',
    PHQTPR: '4.000',
    BARCOD: '40804934',
    LARTAR: 'KUHNE SAUCE MEXICO 250ML',
    SELPPR: '1150.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '59839',
    PHQTPR: '.000',
    BARCOD: '40804941',
    LARTAR: 'KUHNE SAUCE CURRY 250ML',
    SELPPR: '1150.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '5059',
    PHQTPR: '689.000',
    BARCOD: '40822938',
    LARTAR: 'FANTA ORANGE 500ML',
    SELPPR: '280.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '71445',
    PHQTPR: '.000',
    BARCOD: '41007563',
    LARTAR: 'SMARTIES ICONE 85GR',
    SELPPR: '1190.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '16295',
    PHQTPR: '24.000',
    BARCOD: '42068495',
    LARTAR: 'DAVIDOFF BLACK KS SSL',
    SELPPR: '700.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '16297',
    PHQTPR: '31.000',
    BARCOD: '42068556',
    LARTAR: 'DAVIDOFF WHITE KS SSL',
    SELPPR: '700.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '13263',
    PHQTPR: '767.000',
    BARCOD: '42069942',
    LARTAR: 'ORBIT FRESH MINT GUM 13.6GR',
    SELPPR: '160.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '13275',
    PHQTPR: '162.000',
    BARCOD: '42101901',
    LARTAR: 'ECLIPSE ICE FRESHNESS 13.6GR',
    SELPPR: '180.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '13264',
    PHQTPR: '1118.000',
    BARCOD: '42113164',
    LARTAR: 'ORBIT WHITE SREATMINT GUM 13.6GR',
    SELPPR: '160.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '13266',
    PHQTPR: '930.000',
    BARCOD: '42113270',
    LARTAR: 'ORBIT WATERMELON GUM 13.6GR',
    SELPPR: '160.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '13276',
    PHQTPR: '440.000',
    BARCOD: '42124016',
    LARTAR: 'ECLIPSE ICE CHERRY 13.6 GR',
    SELPPR: '180.000'
  }
]

const arr2 = [
  {
    CIDIPR: '80',
    ITEMPR: '57215',
    PHQTPR: '24.000',
    BARCOD: '3409802',
    LARTAR: 'ICE BREAKERS APPLE WAT TANG 42G',
    SELPPR: '1350.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '66489',
    PHQTPR: '.000',
    BARCOD: '30168138',
    LARTAR: 'MAYBELLINE MSCR SNP 02 BLCK CHRRY',
    SELPPR: '3400.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '66490',
    PHQTPR: '.000',
    BARCOD: '30168152',
    LARTAR: 'MAYBELLINE MSCR SNP 04 DARK BLUE',
    SELPPR: '4500.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '60048',
    PHQTPR: '1.000',
    BARCOD: '30168527',
    LARTAR: 'MAYBELLINE LIPSTICK SUPERST MATT 15',
    SELPPR: '4050.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '60049',
    PHQTPR: '2.000',
    BARCOD: '30168534',
    LARTAR: 'MAYBELLINE LIPSTICK SUPERST MATT 20',
    SELPPR: '4450.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '60055',
    PHQTPR: '2.000',
    BARCOD: '30168541',
    LARTAR: 'MAYBELLINE LIPSTICK SUPERST MATT 50',
    SELPPR: '4600.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '66491',
    PHQTPR: '.000',
    BARCOD: '30170643',
    LARTAR: 'MAYBELLINE MSCR SNP 01 BLACK',
    SELPPR: '3680.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '16922',
    PHQTPR: '13.000',
    BARCOD: '40055763',
    LARTAR: 'BUBCHEN SOFT CREAM 20 ML',
    SELPPR: '660.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '7836',
    PHQTPR: '4.000',
    BARCOD: '40122083',
    LARTAR: 'KUHNE APPLE VINEGAR 750ML',
    SELPPR: '1350.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '59832',
    PHQTPR: '1.000',
    BARCOD: '40122113',
    LARTAR: 'KUHNE MUSTARD EXTRA HOT 250ML',
    SELPPR: '1150.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '7838',
    PHQTPR: '.000',
    BARCOD: '40122342',
    LARTAR: 'KUHNE MUSTARD MEDIUM HOT 250ML',
    SELPPR: '1150.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '7841',
    PHQTPR: '4.000',
    BARCOD: '40122526',
    LARTAR: 'KUHNE MUSTARD WHOLEGRAIN 250ML',
    SELPPR: '1150.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '50284',
    PHQTPR: '.000',
    BARCOD: '40144979',
    LARTAR: 'MAMBA CHWNG CANDY TROPIC 106G',
    SELPPR: '520.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '17014',
    PHQTPR: '1.000',
    BARCOD: '40145228',
    LARTAR: 'ZOTT MONTE ZOTT YOGURT 55G',
    SELPPR: '270.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '7666',
    PHQTPR: '5.000',
    BARCOD: '40152240',
    LARTAR: 'TAFT WAX SHINE 75ML',
    SELPPR: '1930.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '65182',
    PHQTPR: '2.000',
    BARCOD: '40198637',
    LARTAR: 'KUHNE HOT CHILI MEAT SAUCE 235ML',
    SELPPR: '1450.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '65180',
    PHQTPR: '12.000',
    BARCOD: '40198644',
    LARTAR: 'KUHNE GARLIC MEAT SAUCE 235ML',
    SELPPR: '1450.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '65183',
    PHQTPR: '.000',
    BARCOD: '40198651',
    LARTAR: 'KUHNE PEPPER BBQ MEAT SAUCE 235ML',
    SELPPR: '1450.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '65181',
    PHQTPR: '8.000',
    BARCOD: '40198668',
    LARTAR: 'KUHNE BURGER STYLE MEAT SAUCE 235ML',
    SELPPR: '1450.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '64315',
    PHQTPR: '1.000',
    BARCOD: '40278063',
    LARTAR: 'WILKINSON RAZOR DUPLO X5',
    SELPPR: '720.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '16306',
    PHQTPR: '27.000',
    BARCOD: '40306544',
    LARTAR: 'DAVIDOFF CLASSIC SLIMS',
    SELPPR: '750.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '16307',
    PHQTPR: '3.000',
    BARCOD: '40306551',
    LARTAR: 'DAVIDOFF GOLD SLIMS',
    SELPPR: '750.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '16136',
    PHQTPR: '.000',
    BARCOD: '40329055',
    LARTAR: 'CAMEL KS FILTERS',
    SELPPR: '700.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '16122',
    PHQTPR: '53.000',
    BARCOD: '40329253',
    LARTAR: 'WINSTON KS CLASSIC',
    SELPPR: '600.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '16123',
    PHQTPR: '62.000',
    BARCOD: '40329574',
    LARTAR: 'WINSTON KS BLUE',
    SELPPR: '600.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '16124',
    PHQTPR: '9.000',
    BARCOD: '40329598',
    LARTAR: 'WINSTON KS SILVER',
    SELPPR: '600.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '16125',
    PHQTPR: '56.000',
    BARCOD: '40331928',
    LARTAR: 'WINSTON KS WHITE',
    SELPPR: '600.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '52765',
    PHQTPR: '.000',
    BARCOD: '40338545',
    LARTAR: 'ZOTT MONTE SNACK 29G',
    SELPPR: '320.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '17010',
    PHQTPR: '.000',
    BARCOD: '40338576',
    LARTAR: 'ZOTTIS YOGURT FRUIT 0.0% 115G',
    SELPPR: '230.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '17012',
    PHQTPR: '1.000',
    BARCOD: '40338637',
    LARTAR: 'ZOTTIS DESERT CHOCOLATE 3.8%115G',
    SELPPR: '230.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '67365',
    PHQTPR: '5.000',
    BARCOD: '40623092',
    LARTAR: 'HIPP WASHING FOAM 250ML',
    SELPPR: '2780.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '67371',
    PHQTPR: '.000',
    BARCOD: '40623900',
    LARTAR: 'HIPP SOS NAPPY RASH CREAM 20ML',
    SELPPR: '1120.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '59837',
    PHQTPR: '1.000',
    BARCOD: '40804835',
    LARTAR: 'KUHNE SAUCE HOT CHILI 250ML',
    SELPPR: '1150.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '59834',
    PHQTPR: '7.000',
    BARCOD: '40804873',
    LARTAR: 'KUHNE DRESSING YOGHURT 250ML',
    SELPPR: '990.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '48423',
    PHQTPR: '9.000',
    BARCOD: '40804880',
    LARTAR: 'KUHNE DRESSING 1000ISLANDS 250ML',
    SELPPR: '990.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '59836',
    PHQTPR: '4.000',
    BARCOD: '40804934',
    LARTAR: 'KUHNE SAUCE MEXICO 250ML',
    SELPPR: '1150.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '59839',
    PHQTPR: '.000',
    BARCOD: '40804941',
    LARTAR: 'KUHNE SAUCE CURRY 250ML',
    SELPPR: '1150.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '5059',
    PHQTPR: '689.000',
    BARCOD: '40822938',
    LARTAR: 'FANTA ORANGE 500ML',
    SELPPR: '280.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '71445',
    PHQTPR: '.000',
    BARCOD: '41007563',
    LARTAR: 'SMARTIES ICONE 85GR',
    SELPPR: '1190.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '16295',
    PHQTPR: '24.000',
    BARCOD: '42068495',
    LARTAR: 'DAVIDOFF BLACK KS SSL',
    SELPPR: '700.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '16297',
    PHQTPR: '31.000',
    BARCOD: '42068556',
    LARTAR: 'DAVIDOFF WHITE KS SSL',
    SELPPR: '700.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '13263',
    PHQTPR: '767.000',
    BARCOD: '42069942',
    LARTAR: 'ORBIT FRESH MINT GUM 13.6GR',
    SELPPR: '160.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '13275',
    PHQTPR: '162.000',
    BARCOD: '42101901',
    LARTAR: 'ECLIPSE ICE FRESHNESS 13.6GR',
    SELPPR: '180.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '13264',
    PHQTPR: '1118.000',
    BARCOD: '42113164',
    LARTAR: 'ORBIT WHITE SREATMINT GUM 13.6GR',
    SELPPR: '160.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '13266',
    PHQTPR: '930.000',
    BARCOD: '42113270',
    LARTAR: 'ORBIT WATERMELON GUM 13.6GR',
    SELPPR: '160.000'
  },
  {
    CIDIPR: '480',
    ITEMPR: '13276',
    PHQTPR: '440.000',
    BARCOD: '42124016',
    LARTAR: 'ECLIPSE ICE CHERRY 13.6 GR',
    SELPPR: '180.000'
  }
]
console.log(getUpdates(arr1, arr2))


describe('get change ', function () {
  describe('#when there is no change', function () {
    it('must return empty  array when there is no change', function () {
      const arr1 = [
        {
          CIDIPR: '480',
          ITEMPR: '7838',
          PHQTPR: '.000',
          BARCOD: '40122342',
          LARTAR: 'KUHNE MUSTARD MEDIUM HOT 250ML',
          SELPPR: '1150.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '7841',
          PHQTPR: '4.000',
          BARCOD: '40122526',
          LARTAR: 'KUHNE MUSTARD WHOLEGRAIN 250ML',
          SELPPR: '1150.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '50284',
          PHQTPR: '.000',
          BARCOD: '40144979',
          LARTAR: 'MAMBA CHWNG CANDY TROPIC 106G',
          SELPPR: '520.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '17014',
          PHQTPR: '1.000',
          BARCOD: '40145228',
          LARTAR: 'ZOTT MONTE ZOTT YOGURT 55G',
          SELPPR: '270.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '7666',
          PHQTPR: '5.000',
          BARCOD: '40152240',
          LARTAR: 'TAFT WAX SHINE 75ML',
          SELPPR: '1930.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '65182',
          PHQTPR: '2.000',
          BARCOD: '40198637',
          LARTAR: 'KUHNE HOT CHILI MEAT SAUCE 235ML',
          SELPPR: '1450.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '65180',
          PHQTPR: '12.000',
          BARCOD: '40198644',
          LARTAR: 'KUHNE GARLIC MEAT SAUCE 235ML',
          SELPPR: '1450.000'
        }
      ]
      const arr2 = [
        {
          CIDIPR: '480',
          ITEMPR: '7838',
          PHQTPR: '.000',
          BARCOD: '40122342',
          LARTAR: 'KUHNE MUSTARD MEDIUM HOT 250ML',
          SELPPR: '1150.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '7841',
          PHQTPR: '4.000',
          BARCOD: '40122526',
          LARTAR: 'KUHNE MUSTARD WHOLEGRAIN 250ML',
          SELPPR: '1150.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '50284',
          PHQTPR: '.000',
          BARCOD: '40144979',
          LARTAR: 'MAMBA CHWNG CANDY TROPIC 106G',
          SELPPR: '520.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '17014',
          PHQTPR: '1.000',
          BARCOD: '40145228',
          LARTAR: 'ZOTT MONTE ZOTT YOGURT 55G',
          SELPPR: '270.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '7666',
          PHQTPR: '5.000',
          BARCOD: '40152240',
          LARTAR: 'TAFT WAX SHINE 75ML',
          SELPPR: '1930.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '65182',
          PHQTPR: '2.000',
          BARCOD: '40198637',
          LARTAR: 'KUHNE HOT CHILI MEAT SAUCE 235ML',
          SELPPR: '1450.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '65180',
          PHQTPR: '12.000',
          BARCOD: '40198644',
          LARTAR: 'KUHNE GARLIC MEAT SAUCE 235ML',
          SELPPR: '1450.000'
        }
      ]
      assert.equal(getUpdates(arr1, arr2).length, 0);
    });
  });

  describe('# 1 change', function () {
    it('must return empty  array when there is no change', function () {
      const arr1 = [
        {
          CIDIPR: '480',
          ITEMPR: '7838',
          PHQTPR: '.000',
          BARCOD: '40122342',
          LARTAR: 'KUHNE MUSTARD MEDIUM HOT 250ML',
          SELPPR: '1150.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '7841',
          PHQTPR: '4.000',
          BARCOD: '40122526',
          LARTAR: 'KUHNE MUSTARD WHOLEGRAIN 250ML',
          SELPPR: '1150.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '50284',
          PHQTPR: '.000',
          BARCOD: '40144979',
          LARTAR: 'MAMBA CHWNG CANDY TROPIC 106G',
          SELPPR: '520.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '17014',
          PHQTPR: '1.000',
          BARCOD: '40145228',
          LARTAR: 'ZOTT MONTE ZOTT YOGURT 55G',
          SELPPR: '270.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '7666',
          PHQTPR: '5.000',
          BARCOD: '40152240',
          LARTAR: 'TAFT WAX SHINE 75ML',
          SELPPR: '1930.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '65182',
          PHQTPR: '2.000',
          BARCOD: '40198637',
          LARTAR: 'KUHNE HOT CHILI MEAT SAUCE 235ML',
          SELPPR: '1450.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '65180',
          PHQTPR: '12.000',
          BARCOD: '40198644',
          LARTAR: 'KUHNE GARLIC MEAT SAUCE 235ML',
          SELPPR: '1450.000'
        }
      ]
      const arr2 = [
        {
          CIDIPR: '80',
          ITEMPR: '7838',
          PHQTPR: '.000',
          BARCOD: '40122342',
          LARTAR: 'KUHNE MUSTARD MEDIUM HOT 250ML',
          SELPPR: '1150.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '7841',
          PHQTPR: '4.000',
          BARCOD: '40122526',
          LARTAR: 'KUHNE MUSTARD WHOLEGRAIN 250ML',
          SELPPR: '1150.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '50284',
          PHQTPR: '.000',
          BARCOD: '40144979',
          LARTAR: 'MAMBA CHWNG CANDY TROPIC 106G',
          SELPPR: '520.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '17014',
          PHQTPR: '1.000',
          BARCOD: '40145228',
          LARTAR: 'ZOTT MONTE ZOTT YOGURT 55G',
          SELPPR: '270.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '7666',
          PHQTPR: '5.000',
          BARCOD: '40152240',
          LARTAR: 'TAFT WAX SHINE 75ML',
          SELPPR: '1930.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '65182',
          PHQTPR: '2.000',
          BARCOD: '40198637',
          LARTAR: 'KUHNE HOT CHILI MEAT SAUCE 235ML',
          SELPPR: '1450.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '65180',
          PHQTPR: '12.000',
          BARCOD: '40198644',
          LARTAR: 'KUHNE GARLIC MEAT SAUCE 235ML',
          SELPPR: '1450.000'
        }
      ]
      assert.equal(getUpdates(arr1, arr2).length, 1);
    });

    it('must return empty  array when there is no change', function () {
      assert.equal(JSON.stringify(getUpdates(arr1, arr2)[0]), JSON.stringify({
        CIDIPR: '80',
        ITEMPR: '57215',
        PHQTPR: '24.000',
        BARCOD: '3409802',
        LARTAR: 'ICE BREAKERS APPLE WAT TANG 42G',
        SELPPR: '1350.000'
      }));
    });
  });

  describe('#when a new array is empty', function () {
    it('must return empty  array when there is no change', function () {
      const arr1 = [
        {
          CIDIPR: '480',
          ITEMPR: '7838',
          PHQTPR: '.000',
          BARCOD: '40122342',
          LARTAR: 'KUHNE MUSTARD MEDIUM HOT 250ML',
          SELPPR: '1150.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '7841',
          PHQTPR: '4.000',
          BARCOD: '40122526',
          LARTAR: 'KUHNE MUSTARD WHOLEGRAIN 250ML',
          SELPPR: '1150.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '50284',
          PHQTPR: '.000',
          BARCOD: '40144979',
          LARTAR: 'MAMBA CHWNG CANDY TROPIC 106G',
          SELPPR: '520.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '17014',
          PHQTPR: '1.000',
          BARCOD: '40145228',
          LARTAR: 'ZOTT MONTE ZOTT YOGURT 55G',
          SELPPR: '270.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '7666',
          PHQTPR: '5.000',
          BARCOD: '40152240',
          LARTAR: 'TAFT WAX SHINE 75ML',
          SELPPR: '1930.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '65182',
          PHQTPR: '2.000',
          BARCOD: '40198637',
          LARTAR: 'KUHNE HOT CHILI MEAT SAUCE 235ML',
          SELPPR: '1450.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '65180',
          PHQTPR: '12.000',
          BARCOD: '40198644',
          LARTAR: 'KUHNE GARLIC MEAT SAUCE 235ML',
          SELPPR: '1450.000'
        }
      ]
      const arr2 = [  
      ]
      assert.equal(getUpdates(arr1, arr2).length, 0);
    });
  });

  describe('# 3 change', function () {
    it('must return empty  array when there is no change', function () {
      const arr1 = [
        {
          CIDIPR: '480',
          ITEMPR: '7838',
          PHQTPR: '.000',
          BARCOD: '40122342',
          LARTAR: 'KUHNE MUSTARD MEDIUM HOT 250ML',
          SELPPR: '1150.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '7841',
          PHQTPR: '4.000',
          BARCOD: '40122526',
          LARTAR: 'KUHNE MUSTARD WHOLEGRAIN 250ML',
          SELPPR: '1150.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '50284',
          PHQTPR: '.000',
          BARCOD: '40144979',
          LARTAR: 'MAMBA CHWNG CANDY TROPIC 106G',
          SELPPR: '520.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '17014',
          PHQTPR: '1.000',
          BARCOD: '40145228',
          LARTAR: 'ZOTT MONTE ZOTT YOGURT 55G',
          SELPPR: '270.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '7666',
          PHQTPR: '5.000',
          BARCOD: '40152240',
          LARTAR: 'TAFT WAX SHINE 75ML',
          SELPPR: '1930.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '65182',
          PHQTPR: '2.000',
          BARCOD: '40198637',
          LARTAR: 'KUHNE HOT CHILI MEAT SAUCE 235ML',
          SELPPR: '1450.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '65180',
          PHQTPR: '12.000',
          BARCOD: '40198644',
          LARTAR: 'KUHNE GARLIC MEAT SAUCE 235ML',
          SELPPR: '1450.000'
        }
      ]
      const arr2 = [
        {
          CIDIPR: '80',
          ITEMPR: '7838',
          PHQTPR: '.000',
          BARCOD: '40122342',
          LARTAR: 'KUHNE MUSTARD MEDIUM HOT 250ML',
          SELPPR: '1150.000'
        },
        {
          CIDIPR: '30',
          ITEMPR: '7838',
          PHQTPR: '.000',
          BARCOD: '40122342',
          LARTAR: 'KUHNE MUSTARD MEDIUM HOT 250ML',
          SELPPR: '1150.000'
        },
        {
          CIDIPR: '80',
          ITEMPR: '7838',
          PHQTPR: '.0w00',
          BARCOD: '40122342',
          LARTAR: 'KUHNE MUSTARD MEDIUM HOT 250ML',
          SELPPR: '1150.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '7841',
          PHQTPR: '4.000',
          BARCOD: '40122526',
          LARTAR: 'KUHNE MUSTARD WHOLEGRAIN 250ML',
          SELPPR: '1150.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '50284',
          PHQTPR: '.000',
          BARCOD: '40144979',
          LARTAR: 'MAMBA CHWNG CANDY TROPIC 106G',
          SELPPR: '520.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '17014',
          PHQTPR: '1.000',
          BARCOD: '40145228',
          LARTAR: 'ZOTT MONTE ZOTT YOGURT 55G',
          SELPPR: '270.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '7666',
          PHQTPR: '5.000',
          BARCOD: '40152240',
          LARTAR: 'TAFT WAX SHINE 75ML',
          SELPPR: '1930.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '65182',
          PHQTPR: '2.000',
          BARCOD: '40198637',
          LARTAR: 'KUHNE HOT CHILI MEAT SAUCE 235ML',
          SELPPR: '1450.000'
        },
        {
          CIDIPR: '480',
          ITEMPR: '65180',
          PHQTPR: '12.000',
          BARCOD: '40198644',
          LARTAR: 'KUHNE GARLIC MEAT SAUCE 235ML',
          SELPPR: '1450.000'
        }
      ]
      assert.equal(getUpdates(arr1, arr2).length, 3);
    });
  });
});
