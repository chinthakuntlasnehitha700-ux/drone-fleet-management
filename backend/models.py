from sqlalchemy import Column, Integer, String
from database import Base


class Drone(Base):
    __tablename__ = "drones"

    id = Column(Integer, primary_key=True, index=True)
    drone_id = Column(String, unique=True, index=True)
    model = Column(String)
    location = Column(String)
    battery = Column(Integer)
    status = Column(String)
    mission = Column(String)