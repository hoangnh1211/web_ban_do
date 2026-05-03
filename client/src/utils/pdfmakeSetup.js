import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts?.pdfMake?.vfs ?? pdfFonts;

const fontAlias = {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf',
};

pdfMake.fonts = {
    Roboto: fontAlias,
    Arial: fontAlias,
    'Times New Roman': fontAlias,
    TimesNewRoman: fontAlias,
    Helvetica: fontAlias,
    Calibri: fontAlias,
    Tahoma: fontAlias,
    Verdana: fontAlias,
};

export function prepareHtmlForPdf(html) {
    const div = document.createElement('div');
    div.innerHTML = html;

    div.querySelectorAll('button').forEach(el => el.remove());

    // Convert list items thành paragraph với marker text
    div.querySelectorAll('ul, ol').forEach(list => {
        const isOrdered = list.tagName === 'OL';
        Array.from(list.querySelectorAll(':scope > li')).forEach((li, idx) => {
            // Xóa text node "::marker" do rich text editor sinh ra
            Array.from(li.childNodes).forEach(node => {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.includes('::marker')) {
                    node.remove();
                }
            });

            const marker = isOrdered ? `${idx + 1}. ` : ' •  ';
            const firstChild = li.firstElementChild;
            if (firstChild) {
                // Prepend marker vào phần tử con đầu (thường là <p>) thay vì tạo thêm dòng mới
                firstChild.innerHTML = marker + firstChild.innerHTML;
                firstChild.style.paddingLeft = '16px';
                while (li.firstChild) list.parentNode.insertBefore(li.firstChild, list);
            } else {
                const p = document.createElement('p');
                p.style.paddingLeft = '16px';
                p.innerHTML = marker + li.innerHTML.replace(/::marker/g, '').trim();
                list.parentNode.insertBefore(p, list);
            }
        });
        list.remove();
    });

    return div.innerHTML;
}

export default pdfMake;
