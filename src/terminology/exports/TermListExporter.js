// @flow

import type Term from '../../terminology/models/Term';
import pdfMake from 'pdfmake';
import path from 'path';
import fileSystem from 'fs';

const normal = path.resolve(process.cwd(), __dirname, './fonts/Roboto-Regular.ttf');
const bold = path.resolve(process.cwd(), __dirname, './fonts/Roboto-Bold.ttf');

function loadImageData(filePath) {
  const file = fileSystem.readFileSync(filePath);
  const data = file.toString('base64');
  return `data:image/jpeg;base64,${data}`;
}

export default class TermListPDFConverter {
  terms: Array<Term>;
  formatter: any;

  constructor(terms: Array<Term>) {
    this.terms = terms;
    this.formatter = new pdfMake({ Roboto: { normal, bold } });
  }

  convertToPDF() {
    const rows = this.terms.map((term) => {
      const row = [
        { text: term.get('value') },
        { text: term.related('spanishTranslations').map(spanishTerm => spanishTerm.get('value')).join(', '), width: 100 },
        { text: term.related('categories').map(category => category.get('name')).join(', ')}
      ];
      return row;
    });

    const documentDefinition = {
      header: {
        columns: [
          { text: 'Medical Spanish Terminology', alignment: 'left', style: 'pageWorks' },
          { text: '1 (888) 879-2575', alignment: 'right', style: 'pageWorks' }
        ]
      },
      content: [
        {
          image: loadImageData(path.resolve(__dirname, './media/Certified_Spanish_Logo.png')),
          width: 300,
          alignment: 'center'
        },
        {
          text: 'Medical Spanish Terminology', alignment: 'center',
          pageBreak: 'after',
          style: 'header'
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto'],
            body: [
              [
                {
                  text: 'Medical Vocabulary: English',
                  style: 'tableHeader'
                },
                {
                  text: 'Medical Vocabulary: Español',
                  style: 'tableHeader'
                },
                {
                  text: 'Medical Specialties',
                  style: 'tableHeader'
                }
              ],
              ...rows
            ]
          }
        }
      ],
      footer: (currentPage, pageCount) => `${currentPage.toString()} of ${pageCount}`,
      styles: {
        header: {
          fontSize: 24,
          bold: true,
          margin: [0, 10, 0, 10] //[left, top, right, bottom]
        },
        subheader: {
          fontSize: 15,
          bold: true
        },
        tableHeader: {
          bold: true
        },
        pageWorks: {
          margin: 5
        }
      }
    };
    return this.formatter.createPdfKitDocument(documentDefinition);
  }
}