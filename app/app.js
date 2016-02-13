angular.module('App', ['ui.router', 'ngResource', 'ngStorage'])

  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: "/",
      templateUrl: 'app/states/home.html'
    })
  })

  .controller('MoneyCtrl', function($interval, $timeout, $localStorage) {
    var self = this;

// game variables
    this.goldenPhone = false;
    this.fort = false;
    this.allPiecesCollected = false;
    this.workerLimit = false;
    this.managerLimit = false;


//test
  //
  // self.user = 'fa fa-user';
  // self.icons = []

// player object
    this.player = {
        hit: 1,
        phones: 0,
        speed: 0,
        fortPieces: 0,
        workers: 0,
        managers: 0,
        shops: 0,
        bettingShops: 0,
        deepDives: 0,
        spaceExplorations: 0
        };

// save / load game functions
    this.saveGame = function() {
      swal(
        'Great!',
        'Game Saved',
        'success'
      )
      $localStorage.player = this.player;
      // console.log($localStorage.data)
    }

    this.load = function() {
      swal(
        'Game Loaded',
        '',
        'success'
      )
      this.player = $localStorage.player
      // console.log(this.data)
    }

// main game loop
    this.loop = function() {
      console.log('clicked!')
      this.player.speed += 1500;
      this.mainLoop = $interval(this.increment, this.player.speed);
    };
    this.genRandom = function() {
      this.random = Math.floor(Math.random() * 50);
    };
    this.increment = function() {
      self.genRandom();
      //self.count+=1;
      self.player.phones += 1;
      //console.log(this.random)
    }

// player click function
    this.click = function() {
      //this.count += this.player.hit
      self.player.phones += this.player.hit;
      this.message = "";
      console.log('Number is' + this.random)
      if (this.random === 5 && !this.goldenPhone) {
        console.log('WOOW!!')
        this.message = "50+ added to click power!"
        swal(
          'Congratulations!',
          'You have found the super rare golden phone (50 click power added!)',
          'success'
        )
        this.goldenPhone = true;
        this.player.hit += 50;
      }
      else if (this.random === 46 && !this.allPiecesCollected ) {
        this.message = "You have a piece of the mighty fort!\n Can you find all 12? "
        this.player.fortPieces++;
        swal(
          'Great job!',
          'You have a piece of the mighty fort!, Can you find all 12?)',
          'success'
        )
        if (this.player.fortPieces >= 1 ) {
          this.allPiecesCollected = true;
        }
      }
    }

// wild card!
  this.buildFortress = function(pieces) {
    if (pieces >= 12) {
      this.message = "You have constructed a mighty fortress, fit for a king!"
      this.fort = true;
    }
    else {
      this.message = "You need more fort pieces!"
    }
  }


// shop functions
    this.hireWorker = function(phones) {
        if (phones >= 10) {
          this.player.hit += 1;
          //self.icons.push(this.user)
          console.log(self.icons)
          this.message = 'Bought!';
          this.player.workers++;
          self.player.phones -= 10;
            if (self.player.workers === 25) {
              swal(
                '25 workers hired!',
                'Speed increased by 100',
                'success'
              )
              $interval.cancel(this.mainLoop)
              this.player.speed -=150;
              this.workerPerk = $interval(this.increment, this.player.speed);
            }
          if (this.player.workers >= 50) {
            swal (
              'Maxium Workers reached!',
              'Speed increased by 200',
              'success'
            )
            this.workerLimit = true;
            $interval.cancel(this.workerPerk);
            this.player.Speed -= 200;
            this.workerPerk2 = $interval(this.increment, this.player.speed);
            this.message = "Maxium amount of workers hired!"
          }
        }
        else {
          this.message = 'Need more coin!';
        }
    }

    this.hireManager = function(phones) {
      if (phones >= 75) {
        this.player.hit += 5;
        this.message = 'Bought!';
        this.player.managers++;
        //this.count -= 75;
        self.player.phones -= 75;
        if (this.player.managers >= 20) {
          this.managerLimit = true;
        }
      }
      else {
        this.message = 'Need more coin!';
      }
    }

    this.newShop = function(phones) {
      if (phones >= 450) {
        this.player.hit += 25;
        this.message = "Built a shop!";
        this.player.shops++;
        // this.count -= 450;
        self.player.phones -= 450;
      }
      else {
        this.message = "Can't afford materials!"
      }
    }

    this.bettingShop = function(phones) {
      if (phones >= 1500) {
        this.player.hit += 75;
        this.message = "Opened betting shop";
        this.player.bettingShops++;
        self.player.phones -= 1500;
      }
      else {
        this.message = "Not rich enough yet kiddo..."
      }
    }

    this.deepDive = function(phones) {
      if (phones >= 3000) {
        this.player.hit += 115;
        this.message = "Bon Voyage!";
        this.player.deepDives++;
        self.player.phones -= 1500;
      }
      else {
        this.message = "Not rich enough yet kiddo..."
      }
    }

    this.spaceExploration = function(phones) {
      if (phones >= 10000) {
        this.player.hit += 275;
        this.message = "Space!";
        this.player.spaceExplorations++;
        self.player.phones -= 10000;
      }
      else {
        this.message = "Not rich enough yet kiddo..."
      }
    }

    // this.doubleSpeed = function(phones) {
    //   if (phones >= 10) {
    //     this.player.speed += 10;
    //     //$interval(this.increment, this.speed);
    //     this.message = 'Bought!';
    //   }
    //   else {
    //     this.message = 'Not enough coin';
    //   }
    // }

    // this.tripleSpeed = function(phones) {
    //   this.player.speed = 500;
    // }
    // call loop
    this.loop();
  })
