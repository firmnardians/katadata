function checkTypo(value) {
	const dictionary = new Typo('id_ID', false, false, { dictionaryPath: '/assets/js/lib/typo/dictionaries' });

	const is_correctly = dictionary.check(value);
	const array_suggestions = dictionary.suggest(value);

	return { is_correctly, array_suggestions };
}

document.addEventListener('alpine:init', () => {
	Alpine.data('form', () => ({
		isLoading: false,
		value: 'Tidor',
		isCorrect: false,
		isNotFound: false,
		isRecomendation: false,

		checkValidate() {
			this.isCorrect = false;
			this.isLoading = true;
			this.isNotFound = false;
			this.isRecomendation = false;

			setTimeout(() => {
				const getResult = document.getElementById('result');

				const typo = checkTypo(this.value);

				if (!typo.is_correctly) {
					if (typo.array_suggestions.length > 0) {
						const render = typo.array_suggestions.map((item) => {
							return `<li class="mb-2">${item} <br/> <a target="_blank" href=https://id.wiktionary.org/wiki/${item}>Pelajari lebih lanjut <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d6efd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"/></svg></a></li>`;
						});

						getResult.innerHTML = render.join('\n');

						this.isRecomendation = true;
					} else {
						this.isNotFound = true;
					}
				} else {
					this.isCorrect = true;
				}

				this.isLoading = false;
			}, 500);
		},
	}));
});

document.getElementById('body').style.display = 'block';
