const express = require('express');
const app = express();

const puppeteer = require('puppeteer');
const reorderArray = require('./controllers/reorderArray');

let scrape = async () => {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  await page.goto('https://www.fundsexplorer.com.br/ranking/')
  await page.waitFor(5000)
  
  const result = await page.evaluate(() => {
    
    const colunas = [];
    document.querySelectorAll('#table-ranking > tbody > tr').forEach(row => {
      
      colunas.push({
        ticket: row.cells[0].textContent,
        setor: row.cells[1].textContent,
        vacancia: Number((row.cells[23].textContent).replace(/N\/A/g, null).replace(/,/g, '.').replace(/%/g, '')),
        dividendYeald12m: Number((row.cells[8].textContent).replace(/,/g, '.').replace(/%/g, '')),
        p_sobre_vpa: Number((row.cells[18].textContent).replace(/,/g, '.')),
        liquidez: Number(row.cells[3].textContent),
        diversificacao: Number(row.cells[25].textContent),
        patrimonio_liquido: Number((row.cells[16].textContent).replace(/R\$ /g, '').replace(/\./g, '').replace(/,/g, '.'))
      });
    });
    
    return colunas;
    
  });
  
  browser.close()
  return result; 
};

app.get('/', function (req, res) {
  
  scrape().then((value) => {
    console.log(value) // sucesso!

    var reorderedArray = reorderArray(value);

    res.json(reorderedArray);
   
  });

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
}); 