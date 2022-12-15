
/*
조건
룰렛 내부는 몇개가 들어올지 모른다.
어떻게 돌릴 것 인가?
어떻게 마크업 할것인가?
*/

class Roulette {
	opts = {} ;
	constructor(){
		this.ruleWrap = null ;
		this.rouleItem = null ;
	}
	init = ( obj , opts ) => {
		this.wrap = document.querySelector('.wrapper') ;
		this.dotWrap = document.querySelector('.dotWrap') ;
		this.ruleWrap = obj ;
		this.opts.len = opts.length ;
		this.opts.wid = this.ruleWrap.getBoundingClientRect().width ;
		this.opts.deg = 360 / this.opts.len ;	// 하나의 삼각형 각도
		this.opts.itemTxt = opts.itemTxt;
		this.opts.arrDeg = Array.from({ length : this.opts.len }, (item, idx) =>{
			return (360 - this.opts.deg) * ( idx+1 ) + ( 360*10) ;
		}) ;
		// console.log( this.opts.deg , this.opts.arrDeg  ) ;
		
		/*
		삼각형의 각도를 알고 있다.
		삼각형을 반으로 나눈 직사각형의 각도는 30도, 90도, 60도
		tanA = 높이 / 밑변
		tanA 의 값(30도) 을 알고 있고 밑변(반지름) 길이를 알 수 있기 때문에 탄젠트 구하는 공식을 역으로 계산하면 높이를 알 수있다. 높이 * 2의 값은 삼각형의 가로 길이 이다. 
		*/
		this.opts.itemWidth = parseInt( Math.tan( (this.opts.deg/2) * Math.PI/180)*(this.opts.wid/2)*2 );
		
		// 스타일 변수로 값 전달
		this.wrap.style.setProperty( '--len', this.opts.len );
		this.wrap.style.setProperty( '--width', this.opts.itemWidth + 'px' );
		this.wrap.style.setProperty( '--bdWidth', this.opts.itemWidth / 2 +'px' );
		this.wrap.style.setProperty( '--deg', this.opts.deg + 'deg' );
		
		Array.from({length: this.opts.len}, (v, i) => this.setMarkUp( i ));
		Array.from({length: this.opts.len}, (v, i) => this.setDotMarkUp( i ));
		
		document.querySelector('.btnStart').addEventListener('click', () => {		
            // 랜덤	
			// let randomNum = parseInt( Math.random() * this.opts.len );
            // 0번고정
			let randomNum = 0;
			// 쿠키생성
			
			if( this.ruleWrap.classList.contains('active') ){ 
				alert('Reset!') 
			} else {
				this.move( randomNum ) ;
				$.cookie('roulette', '1', { expires: 7, path: '/' });
				console.log($.cookie('roulette'));
                setTimeout(() => popup_roulette(), 10500);
				$('.wrapper .btnStart').fadeOut();
			}
		}) ;		
		
	} // end of init
	
	setMarkUp = ( idx ) => {
		// console.log( idx ) ;
		let markup = `
			<div class="item">
				<div class="bx">
					<span class="txt">생일 선물</span>
					<strong>${this.opts.itemTxt[idx]}</strong>
				</div>
			</div>
		`;
		let temp = document.createElement('div');
		temp.innerHTML = markup ; 
		this.ruleWrap.appendChild( temp.firstElementChild );
	} // end of setMarkUp
	
	setDotMarkUp = ( idx ) => {
		let markup = `
			<div></div>
		`;
		let temp = document.createElement('div');
		temp.innerHTML = markup ; 
		this.dotWrap.appendChild( temp.firstElementChild );
	}
	
	move = ( idx ) => {
		// console.log( idx , ' 번 당첨!'  ) ;
		this.ruleWrap.classList.add('active') ;
		this.ruleWrap.style.setProperty( '--move', 'rotate('+ this.opts.arrDeg[idx] +'deg)' );
	}
	
}

let r = new Roulette;
r.init( document.querySelector('.rouleWrap') , 
		 { 
			length : 6 , 
		   itemTxt : [ '상품권', '핸드폰', '가방', '신발', '옷', '꽝', '상품권', '핸드폰', '가방', '신발', '옷', '꽝', '상품권', '핸드폰', '가방', '신발', '옷', '꽝' ] 
		}
) ;

