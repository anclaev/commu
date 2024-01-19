'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Commu API</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-f70c8896016a13286577f4a1265508ae1fdc5c949fe3790cf5852d6f53558dd9ba9860ae91ce06d91947ea8b7f81d653fa509701eb66c5ceb29975fb9da6d746"' : 'data-bs-target="#xs-controllers-links-module-AppModule-f70c8896016a13286577f4a1265508ae1fdc5c949fe3790cf5852d6f53558dd9ba9860ae91ce06d91947ea8b7f81d653fa509701eb66c5ceb29975fb9da6d746"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-f70c8896016a13286577f4a1265508ae1fdc5c949fe3790cf5852d6f53558dd9ba9860ae91ce06d91947ea8b7f81d653fa509701eb66c5ceb29975fb9da6d746"' :
                                            'id="xs-controllers-links-module-AppModule-f70c8896016a13286577f4a1265508ae1fdc5c949fe3790cf5852d6f53558dd9ba9860ae91ce06d91947ea8b7f81d653fa509701eb66c5ceb29975fb9da6d746"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommonModule.html" data-type="entity-link" >CommonModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CommonModule-c1f8cb8a961f451c69795624ea56e5009ed8c0d52dacead13823256706e27d4930d841258dccded0b88af1a031e3a4877225234fbe2aece8715f268b62b67609"' : 'data-bs-target="#xs-injectables-links-module-CommonModule-c1f8cb8a961f451c69795624ea56e5009ed8c0d52dacead13823256706e27d4930d841258dccded0b88af1a031e3a4877225234fbe2aece8715f268b62b67609"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CommonModule-c1f8cb8a961f451c69795624ea56e5009ed8c0d52dacead13823256706e27d4930d841258dccded0b88af1a031e3a4877225234fbe2aece8715f268b62b67609"' :
                                        'id="xs-injectables-links-module-CommonModule-c1f8cb8a961f451c69795624ea56e5009ed8c0d52dacead13823256706e27d4930d841258dccded0b88af1a031e3a4877225234fbe2aece8715f268b62b67609"' }>
                                        <li class="link">
                                            <a href="injectables/ConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfigService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LoggerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoggerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmployeeModule.html" data-type="entity-link" >EmployeeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EmployeeModule-4596692d08b67c1c3900ee9914a2df4892ffd7fa5911012935b5aa8aa1cb29e94ccf413adb764f2f890da35fb6f29c3e5a60644a7dfc05213eed0fc0e0a6abaa"' : 'data-bs-target="#xs-controllers-links-module-EmployeeModule-4596692d08b67c1c3900ee9914a2df4892ffd7fa5911012935b5aa8aa1cb29e94ccf413adb764f2f890da35fb6f29c3e5a60644a7dfc05213eed0fc0e0a6abaa"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EmployeeModule-4596692d08b67c1c3900ee9914a2df4892ffd7fa5911012935b5aa8aa1cb29e94ccf413adb764f2f890da35fb6f29c3e5a60644a7dfc05213eed0fc0e0a6abaa"' :
                                            'id="xs-controllers-links-module-EmployeeModule-4596692d08b67c1c3900ee9914a2df4892ffd7fa5911012935b5aa8aa1cb29e94ccf413adb764f2f890da35fb6f29c3e5a60644a7dfc05213eed0fc0e0a6abaa"' }>
                                            <li class="link">
                                                <a href="controllers/EmployeeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EmployeeModule-4596692d08b67c1c3900ee9914a2df4892ffd7fa5911012935b5aa8aa1cb29e94ccf413adb764f2f890da35fb6f29c3e5a60644a7dfc05213eed0fc0e0a6abaa"' : 'data-bs-target="#xs-injectables-links-module-EmployeeModule-4596692d08b67c1c3900ee9914a2df4892ffd7fa5911012935b5aa8aa1cb29e94ccf413adb764f2f890da35fb6f29c3e5a60644a7dfc05213eed0fc0e0a6abaa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmployeeModule-4596692d08b67c1c3900ee9914a2df4892ffd7fa5911012935b5aa8aa1cb29e94ccf413adb764f2f890da35fb6f29c3e5a60644a7dfc05213eed0fc0e0a6abaa"' :
                                        'id="xs-injectables-links-module-EmployeeModule-4596692d08b67c1c3900ee9914a2df4892ffd7fa5911012935b5aa8aa1cb29e94ccf413adb764f2f890da35fb6f29c3e5a60644a7dfc05213eed0fc0e0a6abaa"' }>
                                        <li class="link">
                                            <a href="injectables/EmployeeRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EmployeeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/EmployeeController.html" data-type="entity-link" >EmployeeController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateEmployeeCommand.html" data-type="entity-link" >CreateEmployeeCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEmployeeDto.html" data-type="entity-link" >CreateEmployeeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEmployeeHandler.html" data-type="entity-link" >CreateEmployeeHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetEmployeeHandler.html" data-type="entity-link" >GetEmployeeHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetEmployeeQuery.html" data-type="entity-link" >GetEmployeeQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemoveEmployeeCommand.html" data-type="entity-link" >RemoveEmployeeCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemoveEmployeeHandler.html" data-type="entity-link" >RemoveEmployeeHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateEmployeeCommand.html" data-type="entity-link" >UpdateEmployeeCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateEmployeeDto.html" data-type="entity-link" >UpdateEmployeeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateEmployeeHandler.html" data-type="entity-link" >UpdateEmployeeHandler</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ConfigService.html" data-type="entity-link" >ConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmployeeRepository.html" data-type="entity-link" >EmployeeRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmployeeService.html" data-type="entity-link" >EmployeeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerService.html" data-type="entity-link" >LoggerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RemovePayloadInterceptor.html" data-type="entity-link" >RemovePayloadInterceptor</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});