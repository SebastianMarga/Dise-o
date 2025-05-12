const getAll = async () => {
    try {
      const response = await fetch("../BD/enfermedades.json");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return []; // opcional, por si falla
    }
  };

export default getAll;
