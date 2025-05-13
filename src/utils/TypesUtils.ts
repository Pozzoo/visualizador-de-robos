export const getAlgorithmByID = (id: number) => {
    switch (id) {
        case 0:
            return 'largura';
        case 1:
            return 'profundidade';
        case 2:
            return 'aprofundamento';
        case 3:
            return 'aestrela';

    }
}