$(document).ready(function(){

  $('#menu').click(function(){
    $(this).toggleClass('fa-times');
    $('header').toggleClass('toggle');
  });

  $(window).on('scroll load',function(){
    $('#menu').removeClass('fa-times');
    $('header').removeClass('toggle');
    if($(window).scrollTop() > 0){
      $('.top').show();
    }else{
      $('.top').hide();
    }
  });

  // smooth scrolling 
  $('a[href*="#"]').on('click',function(e){
    e.preventDefault();
    $('html, body').animate({
      scrollTop : $($(this).attr('href')).offset().top,
    }, 500, 'linear');
  });

  // --- UPDATED SEARCH SCRIPT ---

  // Database of all articles with unique IDs for each accordion button
  const searchableContent = [
    // --- Home Page Content ---
    { id: 'home-sec-1-1', page: 'home.html', title: 'Home | Section 1.1', content: 'This is the content for section 1.1. When you click the header, the content will be shown or hidden.' },
    { id: 'home-sec-1-2', page: 'home.html', title: 'Home | Section 1.2', content: 'This is the content for section 1.2. Click the header to show or hide.' },
    { id: 'home-sec-2-1', page: 'home.html', title: 'Home | Section 2.1', content: 'This is the content for section 2.1. Useful information can be found here.' },
    { id: 'home-sec-3-2', page: 'home.html', title: 'Home | Section 3.2', content: 'The main topic for section 3.2 is web development.' },
    // --- News Page Content ---
    { id: 'news-sec-4-1', page: 'news.html', title: 'News | Section 3.1', content: 'This is the content for section 3.1 inside the news page. Breaking news about technology.' },
    { id: 'news-sec-5', page: 'news.html', title: 'News | Section 5', content: 'Section 5 discusses future technology trends.' },
    { id: 'news-sec-6', page: 'news.html', title: 'News | Section 6', content: 'The plus icon will turn into a minus icon when the section is open.' },
    // --- Contact Page Content ---
    { id: 'contact-sec-7', page: 'contact.html', title: 'Contact | Section 7', content: 'This is the content for section 7. It can be a longer text or other HTML elements like images and lists.' },
    { id: 'contact-sec-8', page: 'contact.html', title: 'Contact | Section 8', content: 'This content for section 8 describes how to get in touch for support.' },
    { id: 'contact-sec-9', page: 'contact.html', title: 'Contact | Section 9', content: 'For partnerships, please review the details in section 9. The plus icon is a key feature.' },
    // --- About Page Content ---
    { id: 'about-sec-10', page: 'about.html', title: 'About | Section 10', content: 'This content for section 10 has details about our company history. Also contains lists.' },
    { id: 'about-sec-11', page: 'about.html', title: 'About | Section 11', content: 'Our company mission and vision are detailed in section 11.' },
    { id: 'about-sec-12', page: 'about.html', title: 'About | Section 12', content: 'Meet the team in section 12. The plus icon helps navigate.' },

    // --- KONTEN DARI HALAMAN ARTIKEL TURUNAN (BARU DITAMBAHKAN) ---
    { 
      id: 'article-170925', 
      page: 'article_170925.html', 
      title: 'Artikel | Pengadaan Proyek EPC Migas', 
      content: 
      'Proses pengadaan di proyek EPC migas biasanya terstruktur dan mengikuti beberapa tahapan utama.'+
      'Perencanaan dan Strategi Pengadaan. Tahap awal ini melibatkan tim proyek untuk menentukan jenis material dan jasa apa saja yang dibutuhkan.'+
      'Permintaan Penawaran (Request for Quotation/RFQ). tim procurement akan mengirimkan RFQ kepada vendor yang telah lolos kualifikasi. '+
      'Dokumen ini berisi spesifikasi teknis yang sangat detail. Evaluasi Penawaran. Tim procurement, bersama dengan tim teknis, akan mengevaluasi semua '+
      'penawaran yang masuk. Evaluasi ini tidak hanya fokus pada harga, tetapi juga pada aspek teknis.' 
    }
  ];

  $('#searchButton').on('click', function() {
    const query = $('#searchInput').val().toLowerCase();
    const resultsContainer = $('#searchResults');
    resultsContainer.html('');

    if (query.length === 0) {
      resultsContainer.html('<div class="result-item"><p>Please enter a keyword to search.</p></div>');
      return;
    }

    const results = searchableContent.filter(item => item.content.toLowerCase().includes(query));
    
    if (results.length > 0) {
      // Group results by page to create a single link per page
      const resultsByPage = results.reduce((acc, item) => {
        // Handle article pages separately from pages with accordions
        const pageKey = item.page.includes('.html#') ? item.page.split('#')[0] : item.page;
        if (!acc[pageKey]) {
          acc[pageKey] = [];
        }
        acc[pageKey].push(item);
        return acc;
      }, {});

      for (const page in resultsByPage) {
        const items = resultsByPage[page];
        const isArticlePage = !items[0].id.includes('-sec-'); // Check if it's a main page or an article
        
        let linkHref = page;
        if (!isArticlePage) {
          const idsToOpen = items.map(item => item.id).join(',');
          linkHref = `${page}#${idsToOpen}`;
        }
        
        const pageTitle = items[0].page.replace('.html', '').replace(/_/g, ' ');

        let contentSnippets = items.map(item => `
            <li>
                <strong>${item.title}:</strong>
                <p>"...${highlight(item.content, query)}..."</p>
            </li>
        `).join('');

        const linkText = isArticlePage ? "Open Article &rarr;" : "Open Page and View Sections &rarr;";

        const resultItem = `
          <div class="result-item">
            <h3>Found ${items.length} result(s) on ${pageTitle} page</h3>
            <ul>${contentSnippets}</ul>
            <a href="${linkHref}" target="_blank">${linkText}</a>
          </div>
        `;
        resultsContainer.append(resultItem);
      }
    } else {
      resultsContainer.html('<div class="result-item"><p>No articles found matching your keyword.</p></div>');
    }
  });

  function highlight(text, query) {
      const regex = new RegExp(`(${query})`, 'gi');
      return text.replace(regex, '<span style="background-color: var(--yellow); color: #000;">$1</span>');
  }
});