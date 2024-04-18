import jsPDF from "jspdf";
import "jspdf-autotable";



export const handleExportPDF = (data,name) => {
    console.log(data)
    const doc = new jsPDF();
    const columns = Object.keys(data[0]);

    doc.autoTable({
      head: [columns],
      body: data.map((row) => Object.values(row)),
    });
    doc.save('tabla_'+name+'.pdf');
  };

  