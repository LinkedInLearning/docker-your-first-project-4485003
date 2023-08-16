/*-----------------------------------------------------

    Title :  Big Star Collectibles
    Usage :  main JS
    Edited:  2022-09-30

-------------------------------------------------------*/



/*  utilities
-------------------------------------------------------*/

let generatedIdCount = 0,
    closeRadioMenu;
const mobileBreakpointMq = matchMedia('(max-width: 991px)'),
      isMoz = 'mozInnerScreenX' in window;

function openDialogPlus(dialogId, focusAfterClosed, focusFirst)
{
	setTimeout(function () // add a small delay for smoother transition effect
	{
		// if the vertical scrollbar is present
		if (document.body.scrollHeight > window.innerHeight)
		{
			// set body's right padding as the width of a vertical scrollbar
			document.body.style['padding-right'] = window.innerWidth - document.documentElement.clientWidth + 'px';
		}
		document.body.style['overflow'] = 'hidden';
		openDialog(dialogId, focusAfterClosed, focusFirst)
	}, mobileBreakpointMq.matches ? 50 : 10);
};

function dialogBackdropTransitionendHandler()
{
	if (event.target !== this || event.propertyName !== 'opacity' || getComputedStyle(this)['opacity'] !== '0')
	{
		return;
	}
	document.body.style['padding-right'] = '';
	document.body.style['overflow'] = '';
	this.querySelector('[role="dialog"]').style['display'] = 'none';
};

function textButtonKeydownHandler()
{
	if (event.key === ' ')
	{
		event.preventDefault();
	}
};



/*  modified plugin functions
-------------------------------------------------------*/

// Explanation:
// some code were commented out by using // or /* */, and the latter may be followed by new one-line code on the same line
// new multi-line code were added between /*** new code start ***/ and /*** new code end ***/


/*
 *  an improved version of the one in utils.js (see plugins.js)
 */
aria.Utils.isFocusable = function (element) {
  if (element.tabIndex < 0) {
    return false;
  }

  if (element.disabled) {
    return false;
  }

  switch (element.nodeName) {
    case 'A':
      /* return !!element.href && element.rel != 'ignore'; */ return !!element.href || element.tabIndex >= 0;
    case 'INPUT':
      return element.type != 'hidden';
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA':
      return true;
    default:
      /* return false; */ return element.tabIndex >= 0;
  }
};



document.removeEventListener('keyup', aria.handleEscape);
/*
 *  modified from the one in dialog.js (see plugins.js)
 */
aria.handleEscape = function (event) {
  /*** new code start ***/
  if (document.activeElement.matches('[aria-controls^="search-popup"]') && getComputedStyle(document.activeElement.nextElementSibling)['opacity'] !== '0')
  {
	  return;
  }
  /*** new code end ***/
  var key = event.which || event.keyCode;

  if (key === aria.KeyCode.ESC && aria.closeCurrentDialog()) {
    event.stopPropagation();
  }
};
document.addEventListener('keyup', aria.handleEscape);



/*
 *  modified from the ones in FontMenuItem.js (see plugins.js)
 */
FontMenuItem.prototype.init = function () {
  this.domNode.setAttribute('tabindex', '-1');

  if (!this.domNode.getAttribute('role')) {
    this.domNode.setAttribute('role', 'menuitemradio');
  }

  this.font = this.domNode.textContent.trim()/*.toLowerCase()*/;

  this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
  this.domNode.addEventListener('click', this.handleClick.bind(this));
  this.domNode.addEventListener('focus', this.handleFocus.bind(this));
  this.domNode.addEventListener('blur', this.handleBlur.bind(this));
  this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
  this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));
};

FontMenuItem.prototype.handleMouseover = function () {
  this.fontMenu.hasHover = true;
  //this.fontMenu.open();
};

FontMenuItem.prototype.handleMouseout = function () {
  this.fontMenu.hasHover = false;
  //setTimeout(this.fontMenu.close.bind(this.fontMenu, false), 300);
};



/*
 *  modified from the ones in FontMenu.js (see plugins.js)
 */
FontMenu.prototype.handleMouseout = function () {
  this.hasHover = false;
  //setTimeout(this.close.bind(this, false), 300);
};

FontMenu.prototype.setFocus = function () {
  this.hasFocus = true;
  this.domNode.classList.add('focus');
  //this.controller.toolbar.domNode.classList.add('focus');
};

FontMenu.prototype.removeFocus = function () {
  this.hasFocus = false;
  this.domNode.classList.remove('focus');
  //this.controller.toolbar.domNode.classList.remove('focus');
  /* setTimeout(this.close.bind(this, false), 300); */ setTimeout(this.close.bind(this, false), 0);
};

FontMenu.prototype.open = function () {
  /*** new code start ***/
  closeRadioMenu = () =>
  {
	  if (event.type === 'click')
	  {
		  if (event.target.closest('.radio-menu-widget > *'))
		  {
			  return;
		  }
	  }
	  else // event.type === 'keyup'
	  {
		  if (event.key !== 'Escape' || event.target.closest('[role="menuitemradio"]'))
		  {
			  return;
		  }
	  }

	  document.removeEventListener('click', closeRadioMenu);
	  document.removeEventListener('keyup', closeRadioMenu);
	  setTimeout(this.close.bind(this, false), 0);
  };
  document.addEventListener('click', closeRadioMenu);
  document.addEventListener('keyup', closeRadioMenu);
  this.domNode.style['display'] = '';
  getComputedStyle(this.domNode)['opacity']; // force a calculation of the value of this CSS property to make CSS transition work

  if (this.domNode.id === 'menu-sort-by')
  {
	  if (mobileBreakpointMq.matches && this.domNode.getBoundingClientRect().left < 20)
	  {
		  this.domNode.style['right'] = parseInt(getComputedStyle(this.domNode)['right']) - (20 - this.domNode.getBoundingClientRect().left) + 'px';
	  }
  }
  /*** new code end ***/

  // Get bounding rectangle of controller object's DOM node
  //var rect = this.controller.domNode.getBoundingClientRect();

  // Set CSS properties
  //this.domNode.style.display = 'block';
  //this.domNode.style.position = 'absolute';
  //this.domNode.style.top = rect.height - 1 + 'px';
  //this.domNode.style.left = '0px';
  //this.domNode.style.zIndex = 100;

  // Set aria-expanded attribute
  this.controller.domNode.setAttribute('aria-expanded', 'true');
};

FontMenu.prototype.close = function (force) {
  if (typeof force !== 'boolean') {
    force = false;
  }

  if (
    force ||
    (!this.hasFocus && !this.hasHover && !this.controller.hasHover)
  ) {
    //this.domNode.style.display = 'none';
    /*** new code start ***/
    document.removeEventListener('click', closeRadioMenu);
    document.removeEventListener('keyup', closeRadioMenu);
    /*** new code end ***/
    this.controller.domNode.removeAttribute('aria-expanded');
  }
};



/*
 *  modified from the one in FontMenuButton.js (see plugins.js)
 */
FontMenuButton.prototype.setFontFamily = function (font) {
  //this.value = font;
  /* this.domNode.innerHTML = font.toUpperCase() + '<span></span>'; */ [...this.domNode.childNodes].find(node => node.nodeType === 3 && node.textContent.trim() !== '').textContent = font;
  //this.domNode.style.fontFamily = font;
  //this.domNode.setAttribute('aria-label', 'Font: ' + font);
  //this.toolbar.activateItem(this);
};



/*  common
-------------------------------------------------------*/

/*
 *  disable outline for mouse clicks
 */
let isInteractedWithMouse = false;
document.documentElement.addEventListener('mousedown', () => isInteractedWithMouse = true, true);
document.documentElement.addEventListener('keydown', () => isInteractedWithMouse = false, true);
document.documentElement.addEventListener('focus', () => isInteractedWithMouse && event.target.classList.add('no-outline'), true);
document.documentElement.addEventListener('blur', () => event.target.classList.remove('no-outline'), true);



/*
 *  blur a certain focused elements
 */
document.body.addEventListener('mouseleave', function ()
{
	const targetedEl = event.target.closest('label, button, a, summary');
	if (targetedEl)
	{
		if (targetedEl.matches('label'))
		{
			for (const sibling of targetedEl.parentElement.children)
			{
				if (sibling.matches('[type="checkbox"], [type="radio"]'))
				{
					sibling.blur();
				}
			}
		}
		else
		{
			targetedEl.blur();
		}
	}
}, true);



/*
 *  form elements
 */

// select
function selectChangeHandler()
{
	this.classList.toggle('placeholder-shown', this.value === '');
};
for (const selectEl of document.querySelectorAll('select'))
{
	selectEl.classList.toggle('placeholder-shown', selectEl.value === '');
	selectEl.addEventListener('change', selectChangeHandler);
}

// required checkboxes
function changeCheckboxesRequiredStatus()
{
	const relatedCheckboxes = document.querySelectorAll('input[type="checkbox"][name="' + this.name + '"]');
	if ([...relatedCheckboxes].find(checkboxEl => checkboxEl.checked === true) !== undefined)
	{
		for (const checkboxEl of relatedCheckboxes)
		{
			if (checkboxEl.classList.contains('originally-required'))
			{
				checkboxEl.required = false;
			}
		}
	}
	else
	{
		if (relatedCheckboxes[0].closest('.validation-triggered'))
		{
			relatedCheckboxes[0].closest('fieldset').classList.add('invalid-inside');
		}
		for (const checkboxEl of relatedCheckboxes)
		{
			if (checkboxEl.classList.contains('originally-required'))
			{
				checkboxEl.required = true;
			}
		}
	}
};
for (const checkboxEl of document.querySelectorAll('input[type="checkbox"][name$="[]"][required]'))
{
	if (checkboxEl.classList.contains('changeCheckboxesRequiredStatus-bound'))
	{
		continue;
	}

	const relatedCheckboxes = document.querySelectorAll('input[type="checkbox"][name="' + checkboxEl.name + '"]');
	for (const checkboxMember of relatedCheckboxes)
	{
		checkboxMember.addEventListener('click', changeCheckboxesRequiredStatus);
		checkboxMember.classList.add('changeCheckboxesRequiredStatus-bound', 'in-a-required-group');
		if (checkboxMember.required)
		{
			checkboxMember.classList.add('originally-required');
		}
	}
}



/*
 *  site navigation
 */
const siteNav = document.querySelector('#banner nav'),
      desktopSiteNavCategWrappers = document.querySelectorAll('#banner nav li > .wrapper'),
      desktopSiteNavCategWrappersTransDelay = 200,
      mobileSiteNavList = siteNav.querySelector('ul').cloneNode(true);


// increase rows for desktop nav categories which have more than 10 items
for (const category of document.querySelectorAll('#banner nav:not(.clone) .wrapper > figure > ul'))
{
	if (category.querySelector(':scope > li:nth-child(11)'))
	{
		const newNumOfRows = Math.ceil(category.children.length / 2);
		category.style['grid-template-rows'] = 'repeat(' + newNumOfRows + ', 1fr)';
	}
}

// toggle desktop site nav category wrappers
let desktopSiteNavCategWrapperBgTimeout;
function desktopSiteNavCategWrappersTransitionendHanlder()
{
	if (event.target !== this || event.propertyName !== 'opacity' || getComputedStyle(this)['opacity'] !== '0')
	{
		return;
	}

	this.style['pointer-events'] = '';
	// if none of the wrappers is displaying
	if ([...desktopSiteNavCategWrappers].find(wrapper => getComputedStyle(wrapper)['opacity'] !== '0') === undefined)
	{
		siteNav.style.setProperty('--height-wrapper-bg', '');
	}
};
function showDesktopSiteNavCategWrapper()
{
	clearTimeout(desktopSiteNavCategWrapperBgTimeout);
	for (const wrapper of desktopSiteNavCategWrappers)
	{
		if (wrapper.parentElement === this)
		{
			this.classList.add('active');
		}
		else
		{
			wrapper.parentElement.classList.remove('active');
		}
	}

	if (event.type === 'mouseenter')
	{
		this.classList.add('mouseentered');
	}

	this.querySelector('.wrapper').style['pointer-events'] = 'auto';
	siteNav.style.setProperty('--opacity-wrapper-bg', 1);
	siteNav.style.setProperty('--height-wrapper-bg', this.querySelector('.wrapper').offsetHeight + 'px');
};
function hideDesktopSiteNavCategWrapper()
{
	if (event.type === 'focusout')
	{
		if (this.classList.contains('mouseentered'))
		{
			return;
		}
	}

	this.classList.remove('mouseentered');
	this.querySelector(':focus')?.blur();
	// if none of the other nav items is active
	if ([...desktopSiteNavCategWrappers].find(wrapper => !this.contains(wrapper) && wrapper.parentElement.classList.contains('active')) === undefined)
	{
		desktopSiteNavCategWrapperBgTimeout = setTimeout(() =>
		{
			this.classList.remove('active');
			siteNav.style.setProperty('--opacity-wrapper-bg', '');
		}, desktopSiteNavCategWrappersTransDelay);
	}
};
for (const wrapper of desktopSiteNavCategWrappers)
{
	wrapper.addEventListener('transitionend', desktopSiteNavCategWrappersTransitionendHanlder);
	wrapper.parentElement.addEventListener('mouseenter', showDesktopSiteNavCategWrapper);
	wrapper.parentElement.addEventListener('focusin'   , showDesktopSiteNavCategWrapper);
	wrapper.parentElement.addEventListener('mouseleave', hideDesktopSiteNavCategWrapper);
	wrapper.parentElement.addEventListener('focusout'  , hideDesktopSiteNavCategWrapper);
}


// mobile nav panel
const navPanel = document.querySelector('#nav-panel');
navPanel.style['display'] = 'none';
navPanel.querySelector('button').after(mobileSiteNavList);
navPanel.insertAdjacentHTML('beforebegin', '<div id="nav-panel-backdrop" class="dialog-backdrop"></div>');
navPanel.previousElementSibling.append(navPanel);
navPanel.parentElement.addEventListener('transitionend', dialogBackdropTransitionendHandler);
document.querySelector('#banner nav > button').addEventListener('click', function ()
{
	navPanel.style['display'] = '';
	openDialogPlus('nav-panel', this);
});
function closeNavPanelHandler()
{
	// if the backgroup receives a click event which was triggered by a child element
	if (this.matches('.dialog-backdrop') && event.target !== this)
	{
		return;
	}

	closeDialog(navPanel.firstElementChild);
};
for (const closer of document.querySelectorAll('#nav-panel-backdrop, #nav-panel > button'))
{
	closer.addEventListener('click', closeNavPanelHandler);
}

// toggle mobile site nav category wrapper
function MobileSiteNavCategWrapperTransitionendHandler()
{
	if (event.target !== this || event.propertyName !== 'height')
	{
		return;
	}

	if (this.clientHeight === 0)
	{
		this.style['display'] = 'none';
	}
	else
	{
		this.style['height'] = '';
		this.style['overflow'] = '';
	}
};
function toggleMobileSiteNavCategories()
{
	if (event.type === 'keyup')
	{
		if (this.matches('a[role="button"]'))
		{
			if (event.key !== ' ' && event.key !== 'Enter')
			{
				return;
			}
		}
	}

	const wrapper = this.nextElementSibling;
	wrapper.style['display'] = '';
	let wrapperExpandedHeight = 0;
	for (const child of wrapper.children)
	{
		wrapperExpandedHeight += child.clientHeight;
	}

	if (this.getAttribute('aria-expanded') === 'false')
	{
		this.parentElement.classList.add('active');
		this.setAttribute('aria-expanded', 'true');
		wrapper.style['height'] = wrapperExpandedHeight + 'px';
	}
	else
	{
		this.parentElement.classList.remove('active');
		this.setAttribute('aria-expanded', 'false');
		wrapper.style['height'] = wrapperExpandedHeight + 'px';
		getComputedStyle(wrapper)['height']; // force a calculation of the value of this CSS property to make CSS transition work
		wrapper.style['overflow'] = 'hidden';
		wrapper.style['height'] = 0;
	}
};
for (const wrapper of document.querySelectorAll('#nav-panel li > .wrapper'))
{
	if (!wrapper.id)
	{
		wrapper.id = 'generated-id-' + ++generatedIdCount;
	}
	const anchorEl = wrapper.previousElementSibling;
	anchorEl.insertAdjacentHTML('beforeend',
	`
		<svg class="icon-chevron-right" width="8" height="14" viewBox="0 0 8 14" aria-hidden="true">
			<path d="M7.60787 5.66723C8.13071 6.18555 8.13071 7.02356 7.60787 7.53878L2.26357 12.8369C1.74699 13.3334 0.92672 13.3334 0.407005 12.8369C-0.122102 12.3278 -0.137755 11.4898 0.375697 10.9653L4.77448 6.60455L0.375697 2.24381C-0.125233 1.73169 -0.125233 0.918514 0.375697 0.403294C0.88915 -0.121237 1.73447 -0.136756 2.26357 0.372257L7.60787 5.66723Z" stroke-width="0" />
		</svg>
	`);
	anchorEl.removeAttribute('href');
	anchorEl.setAttribute('role', 'button');
	anchorEl.setAttribute('aria-expanded', 'false');
	anchorEl.setAttribute('aria-controls', wrapper.id);
	anchorEl.setAttribute('tabindex', '0');
	anchorEl.addEventListener('click', toggleMobileSiteNavCategories)
	anchorEl.addEventListener('keyup', toggleMobileSiteNavCategories)
	anchorEl.addEventListener('keydown', textButtonKeydownHandler)
	wrapper.style['display'] = 'none';
	wrapper.style['height'] = 0;
	wrapper.style['overflow'] = 'hidden';
	wrapper.addEventListener('transitionend', MobileSiteNavCategWrapperTransitionendHandler);
}



/*
 *  toggle search popup
 */
function closeSearchPopup()
{
	const activeSearchPopup = document.querySelector('[id^="search-popup"].active'),
	      activeSearchPopupToggler = activeSearchPopup.previousElementSibling;

	if (event.type === 'click')
	{
		// if the event was triggered by clicking inside the form or while the popup is already hidden
		if (event.target.closest('[role="search"]') || getComputedStyle(activeSearchPopup)['opacity'] !== '1')
		{
			return;
		}
	}
	else // event.type === 'keyup'
	{
		if (event.key !== 'Escape')
		{
			return;
		}
	}

	document.removeEventListener('click', closeSearchPopup);
	activeSearchPopupToggler.setAttribute('aria-expanded', 'false');
	activeSearchPopup.setAttribute('aria-hidden', 'true'); // hide the popup and its focusable children with `aria-hidden` and `tabindex`, respectively, due to a Javascript bug (not exclusive to jQuery): https://github.com/jquery/jquery/issues/4950
	for (const focusable of activeSearchPopup.querySelectorAll('input, button'))
	{
		focusable.setAttribute('tabindex', -1);
	}
	if (event.type === 'keyup' || event.target.closest('[id^="search-popup"].active > button'))
	{
		activeSearchPopupToggler.focus();
	}
	activeSearchPopup.classList.remove('active');
};

function toggleSearchPopup()
{
	const searchPopupToggler = this,
	      searchPopup = searchPopupToggler.nextElementSibling;
	if (searchPopupToggler.getAttribute('aria-expanded') === 'false')
	{
		document.addEventListener('click', closeSearchPopup);
		searchPopupToggler.setAttribute('aria-expanded', 'true');
		searchPopup.removeAttribute('aria-hidden');
		for (const focusable of searchPopup.querySelectorAll('input, button'))
		{
			focusable.removeAttribute('tabindex');
		}
		searchPopup.querySelector('input').focus();
		searchPopup.classList.add('active');
	}
	else
	{
		closeSearchPopup();
	}
};

function initSearchWidget(searchPopupToggler)
{
	const searchPopup = searchPopupToggler.nextElementSibling;
	searchPopupToggler.addEventListener('click', toggleSearchPopup);
	searchPopup.addEventListener('keyup', closeSearchPopup);
	searchPopup.querySelector('form + button')?.addEventListener('click', closeSearchPopup);
};

initSearchWidget(document.querySelector('#search-widget > button'));
initSearchWidget(document.querySelector('#search-widget-mobile > button'));



/*
 *  My Shopping Cart slideout
 */
const cartPanel = document.querySelector('#cart-panel');
cartPanel.style['display'] = 'none';
cartPanel.insertAdjacentHTML('beforebegin', '<div id="cart-panel-backdrop" class="dialog-backdrop"></div>');
cartPanel.previousElementSibling.append(cartPanel);
cartPanel.parentElement.addEventListener('transitionend', dialogBackdropTransitionendHandler);
document.querySelector('#banner button .num').parentElement.addEventListener('click', function ()
{
	cartPanel.style['display'] = '';
	openDialogPlus('cart-panel', this);
});
function closeCartPanelHandler()
{
	if (event.type === 'click')
	{
		// if the backgroup receives a click event which was triggered by a child element
		if (this.matches('.dialog-backdrop') && event.target !== this)
		{
			return;
		}
	}
	else // event.type === 'keyup' (a[role="button"])
	{
		if (event.key !== ' ' && event.key !== 'Enter')
		{
			return;
		}
	}

	closeDialog(cartPanel.firstElementChild);
};
for (const closer of document.querySelectorAll('#cart-panel-backdrop, #cart-panel > button, #cart-panel footer p > a'))
{
	closer.addEventListener('click', closeCartPanelHandler);
	if (closer.matches('a[role="button"]'))
	{
		closer.addEventListener('keyup', closeCartPanelHandler);
		closer.addEventListener('keydown', textButtonKeydownHandler);
	}
}



/*
 *  character list
 */
if (document.querySelector('.char-list'))
{
	for (const moreLink of document.querySelectorAll('.char-list dd > a'))
	{
		moreLink.insertAdjacentHTML('afterend', '<button type="button" class="button bordered grape modal-opener">Quick view</button>');
	}
	const quickView = document.querySelector('#quick-view');
	quickView.style['display'] = 'none';
	quickView.insertAdjacentHTML('beforebegin', '<div id="quick-view-backdrop" class="dialog-backdrop"></div>');
	quickView.previousElementSibling.append(quickView);
	quickView.parentElement.addEventListener('transitionend', dialogBackdropTransitionendHandler);
	document.querySelector('main').addEventListener('click', function ()
	{
		if (!event.target.matches('.modal-opener'))
		{
			return;
		}

		const character = event.target.closest('div');
		quickView.style['display'] = '';
		quickView.querySelector('h1').textContent = character.querySelector('dt').textContent;
		quickView.querySelector('h1 + p').textContent = character.querySelector('dt + dd').textContent; /* job title */
		quickView.querySelector('header + p').innerHTML = character.querySelector('dt + dd + dd + dd').innerHTML; /* description */
		quickView.querySelector('header ~ a').href = character.querySelector('dd > a').href;
		quickView.querySelector('.wrapper > img').alt = 'Full image of ' + character.querySelector('dt').textContent;
		openDialogPlus('quick-view', event.target);
	});
	const closeQuickViewHandler = function ()
	{
		if (this.matches('.dialog-backdrop') && event.target !== this)
		{
			return;
		}

		closeDialog(quickView.firstElementChild);
	};
	for (const closer of document.querySelectorAll('#quick-view-backdrop, #quick-view > button'))
	{
		closer.addEventListener('click', closeQuickViewHandler);
	}

	// if not being preloaded, the character image sometimes has a delay in changing (when opening Quck View of a different character) on Chrome
	const preloadCharFullImage = function ()
	{
		const character = event.target.closest('.char-list > div');
		if (character && getComputedStyle(quickView.parentElement)['opacity'] === '0')
		{
			quickView.querySelector('.wrapper > img').src = character.getAttribute('data-full-img');
		}
	}
	document.querySelector('main').addEventListener('mouseover', preloadCharFullImage);
	document.querySelector('main').addEventListener('focusin'  , preloadCharFullImage);
}



/*
 *  products section
 */
if (document.querySelector('#products'))
{
	// Filter by
	const clearFiltersButton = document.querySelector('#wrapper-in-prod-header section header > a');
	const clearFilters = function ()
	{
		if (event.type === 'keyup')
		{
			if (event.key !== ' ' && event.key !== 'Enter')
			{
				return;
			}
		}

		for (const checkboxEl of document.querySelectorAll('#wrapper-in-prod-header details input'))
		{
			checkboxEl.checked = false;
		}
	};
	clearFiltersButton.addEventListener('click', clearFilters);
	clearFiltersButton.addEventListener('keyup', clearFilters);
	clearFiltersButton.addEventListener('keydown', textButtonKeydownHandler);

	const toggleProdFilterDetails = function ()
	{
		if (event.type === 'keydown' && event.key !== ' ') // Fix a Firefox bug that the browser does not prevent default on Space keydown on <summary>.
		{
			return;
		}

		event.preventDefault();
		const content = this.nextElementSibling;
		if (this.parentElement.open)
		{
			this.parentElement.classList.remove('open');
			content.style['height'] = content.querySelector('ul').clientHeight + 'px';
			getComputedStyle(content)['height']; // force a calculation of the value of this CSS property to make CSS transition work
			content.style['overflow'] = 'hidden';
			content.style['height'] = 0;
		}
		else
		{
			this.parentElement.open = true;
			this.parentElement.classList.add('open');
			content.style['height'] = content.querySelector('ul').clientHeight + 'px';
		}
	};
	const blurFilterOptOnTouchend = function ()
	{
		const label = event.target.closest('label');
		if (label)
		{
			setTimeout(() => label.previousElementSibling.blur(), 10);
		}
	};
	const prodFilterContTransitionendHandler = function ()
	{
		if (event.target !== this || event.propertyName !== 'height')
		{
			return;
		}

		if (this.clientHeight === 0)
		{
			this.parentElement.open = false;
		}
		else
		{
			this.style['height'] = '';
			this.style['overflow'] = '';
		}
	};
	for (const list of document.querySelectorAll('#products details ul'))
	{
		list.parentElement.classList.toggle('open', list.parentElement.open);
		list.previousElementSibling.addEventListener('click', toggleProdFilterDetails);
		if (isMoz)
		{
			list.previousElementSibling.addEventListener('keydown', toggleProdFilterDetails);
		}
		list.addEventListener('touchend', blurFilterOptOnTouchend);
		list.insertAdjacentHTML('beforebegin', '<div class="content"' + (list.parentElement.open === false ? ' style="height: 0; overflow: hidden;"' : '') + '></div>');
		list.previousElementSibling.addEventListener('transitionend', prodFilterContTransitionendHandler);
		list.previousElementSibling.append(list);
	}


	// mobile Filter by
	const wrapperInProdHeader = document.querySelector('#wrapper-in-prod-header');
	wrapperInProdHeader.insertAdjacentHTML('beforebegin', '<div id="filter-by-backdrop" class="dialog-backdrop"></div>');
	const filterByBackdrop = wrapperInProdHeader.previousElementSibling;
	filterByBackdrop.addEventListener('transitionend', dialogBackdropTransitionendHandler);
	const filterByResponsiveChange = function (mq)
	{
		if (mq.matches)
		{
			filterByBackdrop.append(wrapperInProdHeader);
			wrapperInProdHeader.setAttribute('role', 'dialog');
			wrapperInProdHeader.setAttribute('aria-modal', 'true');
			wrapperInProdHeader.setAttribute('aria-labelledby', 'label-filter-by');
			wrapperInProdHeader.style['display'] = 'none';
		}
		else
		{
			filterByBackdrop.after(wrapperInProdHeader);
			wrapperInProdHeader.removeAttribute('role');
			wrapperInProdHeader.removeAttribute('aria-modal');
			wrapperInProdHeader.removeAttribute('aria-labelledby');
			wrapperInProdHeader.style['display'] = '';
		}
	};
	mobileBreakpointMq.addListener(filterByResponsiveChange);
	filterByResponsiveChange(mobileBreakpointMq);

	document.querySelector('#products header .radio-menu-widget + button').addEventListener('click', function ()
	{
		wrapperInProdHeader.style['display'] = '';
		openDialogPlus('wrapper-in-prod-header', this);
	});
	const closeWrapperInProdHeaderHandler = function ()
	{
		if (event.type === 'click')
		{
			// if the backgroup receives a click event which was triggered by a child element
			if (this.matches('.dialog-backdrop') && event.target !== this)
			{
				return;
			}
		}

		closeDialog(wrapperInProdHeader.firstElementChild);
	};
	for (const closer of document.querySelectorAll('#filter-by-backdrop, #wrapper-in-prod-header > button'))
	{
		closer.addEventListener('click', closeWrapperInProdHeaderHandler);
	}


	// Sort by
	const sortByRadioMenuButton = document.querySelector('#btn-sort-by');
	sortByRadioMenuButton.nextElementSibling.style['display'] = 'none';
	sortByRadioMenuButton.nextElementSibling.addEventListener('transitionend', function ()
	{
		if (event.target !== this || event.propertyName !== 'opacity' || getComputedStyle(this)['opacity'] !== '0')
		{
			return;
		}

		this.style['display'] = 'none';
		this.style['right'] = '';
	});
	new FontMenuButton(sortByRadioMenuButton).init();
}



/*
 *  quantity widget
 */
function updateQuantity()
{
	const svg = event.target.closest('svg');
	if (svg)
	{
		const input = svg.parentElement.querySelector('input'),
		      origValue = ~~input.value;
		 // decrease
		if (svg.matches(':first-of-type'))
		{
			input.value = origValue - 1 < 1 ? 1 : origValue - 1;
		}
		 // increase
		else
		{
			input.value = origValue + 1;
		}
	}
};
for (const widget of document.querySelectorAll('.qty-widget'))
{
	widget.addEventListener('click', updateQuantity);
}



/*  homepage
-------------------------------------------------------*/

if (document.querySelector('#hero'))
{
	/*
	 *  hero carousel
	 */
	const heroSlides = document.querySelectorAll('#hero .splide__slide');
	const heroSlidesTransitionednHandler = function ()
	{
		if (event.target !== this || event.propertyName !== 'opacity' || getComputedStyle(this)['opacity'] !== '1')
		{
			return;
		}

		for (const slide of heroSlides)
		{
			slide.classList.remove('opaque');
		}
	};
	const heroCarousel = new Splide('#hero',
	{
		autoplay: true,
		interval: 4000,
		type: 'fade',
		speed: 250,
		easing: 'ease',
		rewind: true
	});

	heroCarousel.on('arrows:mounted', function (prev, next)
	{
		prev.removeAttribute('aria-label');
		next.removeAttribute('aria-label');
	});

	// force the previous slide to be opaque during transition so that the transition looks better
	heroCarousel.on('move', function (newIndex, prevIndex, destIndex)
	{
		heroSlides[prevIndex].classList.add('opaque');
	});
	for (const slide of heroSlides)
	{
		slide.addEventListener('transitionend', heroSlidesTransitionednHandler);
	}

	heroCarousel.mount();
}



/*  product detail page
-------------------------------------------------------*/

else if (document.querySelector('#product'))
{
	// Colors
	document.querySelector('#product fieldset').addEventListener('change', function ()
	{
		const label = event.target.nextElementSibling,
		      fullImage = document.querySelector('#product header .wrapper > img');
		fullImage.src = label.querySelector('img').src;
		fullImage.alt = label.getAttribute('data-full-img-alt')
	});
}



/*  Contact us page
-------------------------------------------------------*/

else if (document.querySelector('#contact'))
{
	const formEl = document.querySelector('#contact form'),
	      dropZone = formEl.querySelector('.drop-zone');
	let errorMessageCount = 0,
	    isScrolling = false;

	formEl.addEventListener('invalid', function ()
	{
		event.preventDefault();

		const formControl = event.target,
		      isInRadioOrCheckboxGroup = formControl.matches('[type="radio"], [type="checkbox"]') && formEl.querySelectorAll(':scope [name="' + formControl.name + '"]').length > 1,
		      formControlMasterWrapper = formControl.closest(isInRadioOrCheckboxGroup ? 'fieldset' : 'div');
		let errorMessage;

		formEl.classList.add('validation-triggered');

		if (isInRadioOrCheckboxGroup)
		{
			switch (formControl.name)
			{
				case 'newsletter':
					errorMessage = 'Would you like to sign up for Big Star newsletter?';
					break;

				case 'favorite[]':
					errorMessage = 'Please select your favorite Big Star Collections';
					break;
			}
		}
		else
		{
			switch (formControl.id)
			{
				case 'contact-email':
					errorMessage = 'Valid email required';
					break;

				case 'contact-name':
					errorMessage = 'Name is required';
					break;

				case 'contact-topic':
					errorMessage = 'Please select a topic';
					break;

				case 'contact-message':
					errorMessage = 'Please write a message';
					break;
			}
		}

		if (formControl.hasAttribute('aria-describedby'))
		{
			document.getElementById(formControl.getAttribute('aria-describedby')).firstChild.textContent = errorMessage + ' ';
		}
		else
		{
			++errorMessageCount;
			formControl.setAttribute('aria-invalid', 'true');
			formControl.setAttribute('aria-describedby', 'error-message-' + errorMessageCount);
			formControlMasterWrapper.insertAdjacentHTML('beforeend', '<div id="error-message-' + errorMessageCount + '" class="error-message" role="alert">' + errorMessage + ' <span aria-hidden="true">*</span></div>');
			formControlMasterWrapper.classList.add('invalid-inside');
		}

		if (!isScrolling)
		{
			// scroll to the invalid form control wrapper if its top or bottom edge is not in view
			const firstInvalidFormControlWrapper = formEl.querySelector('.invalid-inside');
			if (firstInvalidFormControlWrapper.getBoundingClientRect().top < 0 || firstInvalidFormControlWrapper.getBoundingClientRect().bottom > window.innerHeight)
			{
				isScrolling = true;
				const scrollOffset = pageYOffset + firstInvalidFormControlWrapper.getBoundingClientRect().top,
				      fixedScrollOffset = scrollOffset.toFixed();
				const detectScrollCompletion = function ()
				{
					if (pageYOffset.toFixed() === fixedScrollOffset)
					{
						isScrolling = false;
						window.removeEventListener('scroll', detectScrollCompletion);
						// focus the first invalid field for desktop devices
						if (!mobileBreakpointMq.matches)
						{
							firstInvalidFormControlWrapper.querySelector('[aria-invalid="true"]').focus();
						}
					}
				};
				window.addEventListener('scroll', detectScrollCompletion);
				window.scrollTo(
				{
					top: scrollOffset,
					behavior: 'smooth'
				});
			}
		}
	}, true);

	const revalidate = function ()
	{
		const formControl = event.target,
		      relatedRadiosOrCheckboxes = formControl.matches('[type="radio"], [type="checkbox"]') && formControl.name && formEl.querySelectorAll(':scope [name="' + formControl.name + '"]'),
		      isInRadioOrCheckboxGroup = relatedRadiosOrCheckboxes.length > 1,
		      formControlMasterWrapper = formControl.closest(isInRadioOrCheckboxGroup ? 'fieldset' : 'div');

		if (!formEl.classList.contains('validation-triggered'))
		{
			return;
		}

		if (isInRadioOrCheckboxGroup)
		{
			// if already handled when one of the group members became valid
			if (!formControlMasterWrapper.classList.contains('invalid-inside'))
			{
				return;
			}

			if ([...relatedRadiosOrCheckboxes].find(radioOrCheckbox => radioOrCheckbox.checked === true) !== undefined)
			{
				for (const radioOrCheckbox of relatedRadiosOrCheckboxes)
				{
					radioOrCheckbox.removeAttribute('aria-invalid');
					radioOrCheckbox.removeAttribute('aria-describedby');
				}
				for (const radioOrCheckboxErrorMessage of formControlMasterWrapper.querySelectorAll('.error-message'))
				{
					radioOrCheckboxErrorMessage.remove();
				}
				formControlMasterWrapper.classList.remove('invalid-inside');
			}
			else
			{
				[...relatedRadiosOrCheckboxes].find(radioOrCheckbox => radioOrCheckbox.classList.contains('originally-required')).checkValidity();
			}
		}
		else
		{
			if (formControl.checkValidity())
			{
				formControl.removeAttribute('aria-invalid');
				formControl.removeAttribute('aria-describedby');
				formControlMasterWrapper.querySelector('.error-message')?.remove();
				formControlMasterWrapper.classList.remove('invalid-inside');
			}
		}
	};
	formEl.addEventListener('input', revalidate);
	formEl.addEventListener('blur', revalidate);
	formEl.addEventListener('change', revalidate);
	formEl.addEventListener('click', function ()
	{
		const errorMessage = event.target.closest('.error-message');
		if (errorMessage)
		{
			errorMessage.closest('.invalid-inside').querySelector('[aria-invalid="true"]:not([type="radio"]):not([type="checkbox"])').focus();
		}
	});

	formEl.addEventListener('submit', function ()
	{
		event.preventDefault();
		this.reportValidity();
	});

	// drag and drop
	dropZone.addEventListener('dragover', () =>
	{
		event.preventDefault();
		dropZone.classList.add('dragged-over');
	});
	dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragged-over'));
	dropZone.addEventListener('drop', () =>
	{
		event.preventDefault();
		dropZone.classList.remove('dragged-over');
	});
}