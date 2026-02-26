from pydantic import BaseModel, Field
from typing import Literal, Optional, List
from datetime import datetime
import uuid

MonitorType = Literal["flight", "hotel"]


class CreateMonitoringProfileRequest(BaseModel):
    type: MonitorType
    name: str

    origin: Optional[str] = None
    destination: Optional[str] = None
    depart_date: Optional[str] = None
    return_date: Optional[str] = None

    city: Optional[str] = None
    checkin_date: Optional[str] = None
    checkout_date: Optional[str] = None

    currency: str = "USD"
    alert_drop_percent: float = 8.0
    providers: List[str] = Field(default_factory=list)


class MonitoringProfile(BaseModel):
    id: str
    type: MonitorType
    name: str

    origin: Optional[str] = None
    destination: Optional[str] = None
    depart_date: Optional[str] = None
    return_date: Optional[str] = None

    city: Optional[str] = None
    checkin_date: Optional[str] = None
    checkout_date: Optional[str] = None

    currency: str
    alert_drop_percent: float
    providers: List[str]
    created_at: str


def new_profile(req: CreateMonitoringProfileRequest) -> MonitoringProfile:
    return MonitoringProfile(
        id=str(uuid.uuid4()),
        type=req.type,
        name=req.name,
        origin=req.origin,
        destination=req.destination,
        depart_date=req.depart_date,
        return_date=req.return_date,
        city=req.city,
        checkin_date=req.checkin_date,
        checkout_date=req.checkout_date,
        currency=req.currency,
        alert_drop_percent=req.alert_drop_percent,
        providers=req.providers,
        created_at=datetime.utcnow().isoformat() + "Z",
    )

