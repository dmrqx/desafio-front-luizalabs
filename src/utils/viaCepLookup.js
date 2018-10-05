export class ViaCepLookup {
  /**
   * Handle JSONP call to ViaCEP api
   * @param {string} cep - Desired CEP for querying
   * @see {@link https://viacep.com.br|ViaCEP}
   */
  queryCep(cep) {
    // Set unique callback handler
    const hash = Math.random().toString(36).substring(2, 15),
          apiUrl = `https://viacep.com.br/ws/${cep}/json/?callback=_${hash}`;

    return this.scriptTag(apiUrl, hash)
      .then(data => {
        if (data.erro) {
          return {errorMessage: `O CEP ${cep} não foi encontrado`};
        }
        return data;
      })
      .catch(() => {
        throw new Error(`Ocorreu um erro ao pesquisar o CEP ${cep}`);
      });
  }

  /**
   * Inject script to body tag for making JSONP requests
   * @param {string} src - The script source url
   * @param {string} cb - The unique callback function name
   * @returns {Promise} - Promise object represents api request response
   */
  scriptTag(src, cb) {
    return new Promise((resolve, reject) => {
      const handleLoad = (response) => resolve(response),
            handleError = () => reject();

      let body = document.body,
          tag = document.createElement('script');

      // Point api callback to Promise resolve
      window[`_${cb}`] = handleLoad;
      // Handle Bad Request errors
      tag.addEventListener('error', handleError);

      tag.src = src;
      body.appendChild(tag);
    });
  }
}
