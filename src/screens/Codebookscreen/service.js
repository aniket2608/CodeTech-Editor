const languageCodeMap = {
    cpp: 54,
    python: 92,
    javascript: 93,
    java: 91,
};

async function getSubmission(tokenId) {
    const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
    const options = {
        method: 'GET',
        headers: {
            'content-type': 'application/octet-stream',
            'X-RapidAPI-Key': '7204430a99msh429d38d58e7c526p15c2bcjsn930ca895f5ff',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}

export async function makeSubmission(code, language, callback, stdin) {
    const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*';
    const httpOptions = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '7204430a99msh429d38d58e7c526p15c2bcjsn930ca895f5ff',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        body: JSON.stringify({
            language_id: languageCodeMap[language],
            source_code: btoa(code), // Assuming you meant base64 encoding
            stdin: btoa(stdin) // Assuming you meant base64 encoding
        })
    }

    try {
        callback({ apiStatus: 'loading' });
        const response = await fetch(url, httpOptions);
        const result = await response.json();
        const tokenId = result.token;
        let statusCode = 1; // in queue
        let apiSubmissionResult;
        while (statusCode === 1 || statusCode === 2) {
            try {
                apiSubmissionResult = await getSubmission(tokenId);
                statusCode = apiSubmissionResult.status.id;
            } catch (error) {
                callback({ apiStatus: 'error', message: JSON.stringify(error) });
                return;
            }
        }
        if (apiSubmissionResult) {
            callback({ apiStatus: 'success', data: apiSubmissionResult });
        }
    } catch (error) {
        callback({
            apiStatus: 'error',
            message: JSON.stringify(error)
        });
    }
};
