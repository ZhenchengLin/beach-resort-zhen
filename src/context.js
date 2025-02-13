import React, { Component } from 'react'
import items from "./data"; // this is the data that we are accessing for later use
import Client from './contentful'
Client.getEntries({
    content_type: "beachResortRoom"
}).then(response => console.log(response.items)); 
const RoomContext = React.createContext();
class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    };

    // getData{} later to use
    getData = async () => {
        try{
            let response = await Client.getEntries({
                content_type: "beachResortRoom",
                order: "fields.price"
            });
            let rooms = this.formatData(response.items);
            let featuredRooms = rooms.filter(room => room.featured === true);
        
            // Get min and max prices
            let prices = rooms.map(item => item.price);
            let minPrice = Math.min(...prices); 
            let maxPrice = Math.max(...prices); 
        
            // Get min and max sizes
            let sizes = rooms.map(item => item.size);
            let minSize = Math.min(...sizes);
            let maxSize = Math.max(...sizes);
        
            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
                minPrice,  
                maxPrice,  
                minSize,
                maxSize,
                price: maxPrice, 
                size: maxSize
            });

        }catch (error) {
            console.log("Error fetching data from Contentful:", error);
        }
        
    }

    componentDidMount() {
        this.getData()
    }
    

    formatData(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);
            let room = { ...item.fields, id, images };
            return room;

        })
        return tempItems;
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug);
        return room;
    }
    handleChange = event => {
        const target = event.target;
        const name = target.name;
        let value = target.type === "checkbox" ? target.checked : target.value;
    
        if (target.type === "range" || name === "price") {
            value = parseInt(value, 10);
        }
    
        console.log(`Updating state: ${name} =`, value); // Debugging
    
        this.setState(
            {
                [name]: value
            },
            this.filterRooms
        );
    };
    
    filterRooms = () => {
        let{
            rooms,type,capacity,price,minSize,maxSize,breakfast,pets
        } = this.state;
        // all the rooms
        let tempRooms = [...rooms];
        // transform value
        capacity = parseInt(capacity)
        price = parseInt(price)


        //filter by type
        if(type !== 'all'){
            tempRooms = tempRooms.filter(room => room.type === type)
        }

        // filter by compacity
        if(capacity !== 1)
        {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }

        // filter by price
        tempRooms = tempRooms.filter(rooms => rooms.price <= price);

        // filter by size
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size<maxSize)

        // filter by breakfast
        if(breakfast)
        {
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        }
        // filter by pets
        if(pets)
        {
            tempRooms = tempRooms.filter(room => room.pets === true)
        }


        // change state
        this.setState({
            sortedRooms:tempRooms
        })
    }
    render() {
        return (
            <RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom, handleChange: this.handleChange }}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return <RoomConsumer>
            {value => <Component {...props} context={value} />}
        </RoomConsumer>
    }
}

export { RoomConsumer, RoomContext, RoomProvider };
