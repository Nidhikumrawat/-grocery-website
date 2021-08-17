import generator from 'generate-password'

export const password = generator.generate({
        length: 10,
        numbers: true
    });
