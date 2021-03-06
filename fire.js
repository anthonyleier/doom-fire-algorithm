const vetorFogo = [];
const larguraFogo = 40;
const alturaFogo = 40;
const paletaCoresFogo = [
	{r: 7, g: 7, b: 7},
	{r: 31, g: 7, b: 7},
	{r: 47, g: 15, b: 7},
	{r: 71, g: 15, b: 7},
	{r: 87, g: 23, b: 7},
	{r: 103, g: 31, b: 7},
	{r: 119, g: 31, b: 7},
	{r: 143, g: 39, b: 7},
	{r: 159, g: 47, b: 7},
	{r: 175, g: 63, b: 7},
	{r: 191, g: 71, b: 7},
	{r: 199, g: 71, b: 7},
	{r: 223, g: 79, b: 7},
	{r: 223, g: 87, b: 7},
	{r: 223, g: 87, b: 7},
	{r: 215, g: 95, b: 7},
	{r: 215, g: 95, b: 7},
	{r: 215, g: 103, b: 15},
	{r: 207, g: 111, b: 15},
	{r: 207, g: 119, b: 15},
	{r: 207, g: 127, b: 15},
	{r: 207, g: 135, b: 23},
	{r: 199, g: 135, b: 23},
	{r: 199, g: 143, b: 23},
	{r: 199, g: 151, b: 31},
	{r: 191, g: 159, b: 31},
	{r: 191, g: 159, b: 31},
	{r: 191, g: 167, b: 39},
	{r: 191, g: 167, b: 39},
	{r: 191, g: 175, b: 47},
	{r: 183, g: 175, b: 47},
	{r: 183, g: 183, b: 47},
	{r: 183, g: 183, b: 55},
	{r: 207, g: 207, b: 111},
	{r: 223, g: 223, b: 159},
	{r: 239, g: 239, b: 199},
	{r: 255, g: 255, b: 255},
];

function start() {
	estruturaFogo();
	fonteFogo();
	renderFogo();

	setInterval(propagacaoFogo, 60);
}

function estruturaFogo() {
	const qtdPixels = larguraFogo * alturaFogo;

	for (let i = 0; i < qtdPixels; i++) {
		vetorFogo[i] = 0;
	}
}

function propagacaoFogo() {
	for (let coluna = 0; coluna < larguraFogo; coluna++) {
		for (let linha = 0; linha < alturaFogo; linha++) {
			const indicePixelAtual = coluna + linha * larguraFogo;
			atualizarPixelFogo(indicePixelAtual);
		}
	}

	renderFogo();
}

function atualizarPixelFogo(indicePixelAtual) {
	const indicePixelAbaixo = indicePixelAtual + larguraFogo;

	if (indicePixelAbaixo >= larguraFogo * alturaFogo) {
		return;
	}

	const taxa = Math.floor(Math.random() * 3);
	const intensidadePixelAbaixo = vetorFogo[indicePixelAbaixo];
	const novaIntensidade = intensidadePixelAbaixo - taxa >= 0 ? intensidadePixelAbaixo - taxa : 0;

	vetorFogo[indicePixelAtual - taxa] = novaIntensidade;
}

function fonteFogo() {
	for (let coluna = 0; coluna <= larguraFogo; coluna++) {
		const pixelBase = larguraFogo * alturaFogo - larguraFogo + coluna;

		vetorFogo[pixelBase] = 36;
	}
}

function renderFogo() {
	const debug = false;
	let html = '<table cellpadding=0 cellspacing=0>';

	for (let linha = 0; linha < alturaFogo; linha++) {
		html += '<tr>';

		for (let coluna = 0; coluna < larguraFogo; coluna++) {
			const indicePixel = coluna + linha * larguraFogo;
			const valorFogo = vetorFogo[indicePixel];

			if (debug === true) {
				html += '<td>';
				html += `<div class="indice">${indicePixel}</div>`;
				html += valorFogo;
				html += '</td>';
			} else {
				const color = paletaCoresFogo[valorFogo];
				const colorString = `${color.r},${color.g},${color.b}`;

				html += `<td class="pixel" style="background-color : rgb(${colorString})">`;
				html += '</td>';
			}
		}
		html += '</tr>';
	}

	html += '</table>';
	document.querySelector('#canvasFogo').innerHTML = html;
}

start();
