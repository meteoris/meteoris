Namespace('Meteoris.Controller');

Meteoris.Controller = Class.extend({
    increment: 5,
    router: FlowRouter,
    deps: new Tracker.Dependency,
    _id: "",
    setId: function(_id){
        this._id = _id;
        this.deps.changed();
    },
    getId: function() {
        var _id = "";
        if(this.router.getParam('id')){
            _id = this.router.getParam('id');
        }else if(this._id){
            this.deps.depend();
            _id = this._id;
        }
        return _id;
    },
    limit: function() {
        return parseInt(this.router.getQueryParam('limit')) || this.increment;
    },
    hasMore: function(models) {
        var currPath = this.router.current().path;
        if (currPath)
            currPath = this.router.current().path.split("?")[0];
        return this.limit() == models.fetch().length ? this.router.path(currPath, {}, {limit: this.limit() + this.increment}) : null;
    }
});